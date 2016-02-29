/*=============================================================================
 * Copyright (C) 2015-2016 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

// import Icon from 'components/Icon';

// Make Babel optimizations happy.  One of the optimization plugins we use for
// production builds doesn't like the use of `Navbar.Brand` in JSX elements.
// So we rename them here to `NavbarBrand` for instance.
const {
  Brand:    NavbarBrand,
  Header:   NavbarHeader,
} = Navbar;

class Header extends React.Component {
  render() {
    return (
      <Navbar className="flight-Navbar" fluid fixedTop>
        <NavbarHeader>
          <NavbarBrand className="flight-Navbar-brand"><Link to="/">Alces Flight</Link></NavbarBrand>
        </NavbarHeader>
      </Navbar>
    )
  }
}

export default Header;
