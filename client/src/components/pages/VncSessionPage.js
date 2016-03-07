
import React from 'react';
import {Button, ButtonGroup, ButtonToolbar, Input} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

import NoVnc from 'components/NoVnc';
import StandardModal from 'components/StandardModal';
import ToolbarButton from 'components/ToolbarButton';
import ToolbarCopyButton from 'components/ToolbarCopyButton';

class VncSessionPage extends React.Component {
  render() {
    const {
      cluster,
      displayInfoModal,
      hidePasteModal,
      fields: {
        pastedText,
      },
      formActions,
      novnc,
      pasteComplete,
      pasteText,
      session,
      setCopyText,
      showPasteModal,
      stateChange,
    } = this.props;


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
              <ToolbarCopyButton
                novnc={novnc}
                displayInfoModal={displayInfoModal}
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
            formActions={formActions}
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
}

VncSessionPage = reduxForm({
  fields: ['pastedText'],
  form: 'vnc-paste-modal',
})(VncSessionPage);

export default VncSessionPage;
