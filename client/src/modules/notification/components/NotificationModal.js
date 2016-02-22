/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React, {PropTypes} from 'react';

import StandardModal from 'components/StandardModal';
import {
  generateErrorMessage, generateInformationMessage
} from 'notification/messageGeneration';

export default class NotificationModal extends React.Component {
  render() {
    let message = this.props.message;

    if (message === undefined) {
      message = {title: undefined, content: undefined, messageId: "undefined"};
    } else if (message.messageType === "error") {
      message = generateErrorMessage(message);
    } else {
      message = generateInformationMessage(message);
    }

    return (
      <StandardModal
        title={message.title}
        onHide={this.props.onHide}
        show={this.props.show}
        buttons={message.actions}
        >
        {message.content}
      </StandardModal>
    )
  }
}

const messageShape = {
  title: PropTypes.string,
  content: PropTypes.string
};

NotificationModal.propTypes = {
  message: PropTypes.shape(messageShape)
}
