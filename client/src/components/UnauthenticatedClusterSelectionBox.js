
import _ from 'lodash';
import React from 'react';
import {Button, Input} from 'react-bootstrap';
import FlipCard from 'react-flipcard';
import {reduxForm} from 'redux-form';

import Icon from 'components/Icon';

class UnauthenticatedClusterSelectionBox extends React.Component {
  render() {
    const {cluster} = this.props;

    const {
      authenticate,
      fields: {username, password},
      handleSubmit,
      submitting,
    } = this.props;

    const authenticateCluster = _.partial(authenticate, cluster.ip);

    const incomplete = !(username.value && password.value);

    const submitButtonIcon = submitting ? "cluster-authenticating" : "cluster";
    const submitButtonText = (
      <span>
        Login&nbsp;&nbsp;<Icon name={submitButtonIcon}/>
      </span>
    );


    return (
      <div
        className="flip-selection-box"
        >
        <FlipCard>
          <div className="flip-selection-box-front">
            <p>
              <strong>{cluster.name}</strong>
            </p>
            <p>
              IP: {cluster.ip}
            </p>
            <p>
              <em>Click to login</em>
            </p>
          </div>
          <div className="flip-selection-box-back">
            <p>
              {cluster.name}
            </p>
            <form onSubmit={handleSubmit(authenticateCluster)}>
              <Input placeholder="Username" type="text" {...username}/>
              <Input placeholder="Password" type="password" {...password}/>
              <Button
                className="selection-box-button"
                type="submit"
                bsStyle="success"
                disabled={incomplete || submitting}
                >
                {submitButtonText}
              </Button>
            </form>
          </div>
        </FlipCard>
      </div>
    );
  }
}

UnauthenticatedClusterSelectionBox = reduxForm({
  fields: ['username', 'password'],
})(UnauthenticatedClusterSelectionBox);

export default UnauthenticatedClusterSelectionBox

