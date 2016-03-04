
import ClipboardAction from 'clipboard/lib/clipboard-action';
import React from 'react';
import {Button, ButtonGroup, ButtonToolbar, Input} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

import {ContactCustomerSupport} from 'components/CustomerSupport';
import NoVnc from 'components/NoVnc';
import StandardModal from 'components/StandardModal';
import ToolbarButton from 'components/ToolbarButton';
import {infoGeneratorsMap} from "notification/messageGeneration"
import MessageGenerator from "notification/MessageGenerator";

// Set up copy messages.
const noTextCode = 'vnc-session-no-text';
const copyFailedCode = 'vnc-session-copy-failed';
infoGeneratorsMap.addGeneratorForCode(
  noTextCode,
  new MessageGenerator(
    "No text to copy",
    <p>
      Select or copy some text within the VNC session to copy to your
      computer's clipboard.
    </p>
  )
).addGeneratorForCode(
  copyFailedCode,
  new MessageGenerator(
    "Copy failed",
    <p>
      The copy of text from the VNC session failed, possibly because your web
      browser does not support this feature. <ContactCustomerSupport/>
    </p>
  )
);

class VncSessionPage extends React.Component {
  constructor(props) {
    super(props);
    this.emitter = {
      emit: (event) => {
        if (event !== 'success') {
          this.props.displayInfoModal(copyFailedCode);
        }
      },
    }
  }

  render() {
    const {
      cluster,
      hidePasteModal,
      fields: {
        pastedText,
      },
      novnc,
      pasteComplete,
      pasteText,
      session,
      setCopyText,
      showPasteModal,
      stateChange,
    } = this.props;


    const url = `ws://${cluster.ip}:${session.websocket}/websockify`;
    const pasteModalButtons = (
      <Button
        onClick={pasteText}
        bsStyle="success"
      >
        Paste
      </Button>
    );

    return (
      <div className="container">
        <div className="vnc-container">
          <ButtonToolbar className="vnc-button-toolbar">
            {/* Sound toggle planned for future iteration.
            <ButtonGroup>
              <ToolbarButton
                iconName="vnc-volume-on"
                tooltip="Disable sound (currently ON)"
              />
            </ButtonGroup>
            */}
            <ButtonGroup>
              <ToolbarButton
                iconName="vnc-copy"
                tooltip="Copy"
                active={novnc.copyMode}
                onClick={this.handleClickCopyButton.bind(this)}
              />
              <ToolbarButton
                iconName="vnc-paste"
                tooltip="Paste"
                onClick={showPasteModal}
              />
            </ButtonGroup>
            <ButtonGroup>
              <ToolbarButton
                iconName="vnc-interactive"
                tooltip="Interactive mode"
              />
              <ToolbarButton
                iconName="vnc-drag-viewport"
                tooltip="Drag viewport mode"
              />
            </ButtonGroup>
          </ButtonToolbar>
          <NoVnc
            url={url}
            password={session.password}
            stateChange={stateChange}
            setCopyText={setCopyText}
            pasteComplete={pasteComplete}
            novnc={novnc}
          />
        </div>
        <StandardModal
          show={novnc.showingPasteModal}
          title="Paste text to VNC session"
          onHide={hidePasteModal}
          buttons={pasteModalButtons}
        >
          <form>
            <p>
              Enter some text to be sent to the VNC session below.
            </p>
            <Input type="textarea" {...pastedText}/>
          </form>
        </StandardModal>
      </div>
    );
  }

  handleClickCopyButton() {
    const {novnc: {copyText}, displayInfoModal} = this.props;

    // Display modal and do nothing if no text copied within session yet.
    if (!copyText) {
      displayInfoModal(noTextCode);
      return;
    }

    // This will copy the stored text, received from the session clipboard to
    // the system clipboard.
    new ClipboardAction({
      action: 'copy',
      emitter: this.emitter,
      text: copyText,
    });
  }
}

VncSessionPage = reduxForm({
  fields: ['pastedText'],
  form: 'vnc-paste-modal',
})(VncSessionPage);

export default VncSessionPage;
