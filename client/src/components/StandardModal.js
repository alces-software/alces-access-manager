/*=============================================================================
 * Copyright (C) 2015-2016 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

// Make Babel optimizations happy.  One of the optimization plugins we use for
// production builds doesn't like the use of `Navbar.Brand` in JSX elements.
// So we rename them here to `NavbarBrand` for instance.
const {
  Body:   ModalBody,
  Footer: ModalFooter,
  Header: ModalHeader,
  Title:  ModalTitle
} = Modal;

export default class StandardModal extends React.Component {
  render() {
    const { bsSize, title, children, show, onHide } = this.props;
    const closeButtonText = this.props.closeButtonText || 'Close';

    return (
      <div>
        <Modal show={show} onHide={onHide} bsSize={bsSize}>
          <ModalHeader closeButton>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            {this.props.buttons}
            <Button onClick={onHide}>{closeButtonText}</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
