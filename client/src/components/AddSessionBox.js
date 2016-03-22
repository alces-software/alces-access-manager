
import _ from 'lodash';
import React from 'react';
import {Button, Input} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

import ButtonContent from 'components/ButtonContent';
import SelectionBoxButtonContainer from 'components/SelectionBoxButtonContainer';

class AddSessionBox extends React.Component {
  render() {
    const {
      fields: {sessionType},
      launchingSession,
      launchSession,
      handleSubmit,
      sessionTypes,
    } = this.props;

    // TODO: make buttons in different boxes line up.

    return (
      <form onSubmit={handleSubmit(launchSession)}>
        <div className="static-selection-box add-item-box">
          <p>
            <strong>Launch new session</strong>
          </p>
          <Input type="select" {...sessionType} placeholder="select">
            <option value={""}>Select session type...</option>
            {_.map(sessionTypes, (type, key) => (
            <option value={type} key={key}>{type}</option>
            ))}
          </Input>
          <SelectionBoxButtonContainer>
            <Button
              bsStyle="success"
              className="selection-box-button"
              type="submit"
              disabled={!sessionType.value || launchingSession}
            >
              <ButtonContent
                text="Launch"
                iconName={launchingSession ? "session-launching" : "session-launch"}
              />
            </Button>
          </SelectionBoxButtonContainer>
        </div>
      </form>
    );
  }
}

AddSessionBox = reduxForm({
  fields: ['sessionType'],
  form: 'launch-session',
})(AddSessionBox);

export default AddSessionBox;
