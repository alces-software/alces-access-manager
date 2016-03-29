
import _ from 'lodash';
import React from 'react';
import {Button, Input} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

import ButtonContent from 'components/ButtonContent';
import SelectionBoxButtonContainer from 'components/SelectionBoxButtonContainer';
import StandardModal from 'components/StandardModal';

class AddSessionBox extends React.Component {
  render() {
    const {
      fields: {sessionType, node},
      launchSession,
      handleSubmit,
      sessionTypes,
      ui,
      uiActions,
    } = this.props;

    const launchDisabled = !sessionType.value || !node.value || ui.launchingSession;

    return (
      <div>
        <form onSubmit={handleSubmit(launchSession)}>
          <div className="static-selection-box add-item-box">
            <p>
              <strong>Launch new session</strong>
            </p>
            <Input type="select" {...sessionType}>
              <option value={""}>Select session type...</option>
              {_.map(sessionTypes, (type, key) => (
              <option value={type} key={key}>{type}</option>
              ))}
            </Input>
            <Input type="select" {...node}>
              <option value={""}>Select node to launch on...</option>
              <option value="login">Login node</option>
              <option value="compute">Request compute node</option>
            </Input>
            <SelectionBoxButtonContainer>
              <Button
                bsStyle="success"
                className="selection-box-button"
                type="submit"
                disabled={launchDisabled}
              >
                <ButtonContent
                  text="Launch"
                  iconName={ui.launchingSession ? "session-launching" : "session-launch"}
                />
              </Button>
            </SelectionBoxButtonContainer>
          </div>
        </form>
        <StandardModal
          show={ui.showingLaunchFailedModal}
          onHide={uiActions.closeLaunchFailedModal}
          title="Session launch failed"
        >
          <p>
            The session failed to launch, the message returned by the <em>Alces
              Access Manager</em> daemon is:
          </p>
          <pre>{ui.launchFailedResponse}</pre>
        </StandardModal>
      </div>
    );
  }
}

AddSessionBox = reduxForm({
  fields: ['sessionType', 'node'],
  form: 'launch-session',
})(AddSessionBox);

export default AddSessionBox;
