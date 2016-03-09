
import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router';

// Import these components directly to make Babel optimizations happy.  One of
// the optimization plugins we use for production builds doesn't like the use
// of `Navbar.Brand` in JSX elements.
// TODO: Do same in Aviator.
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';

import {NavItemLink} from 'components/Links';

class Header extends React.Component {
  render() {
    return (
      <Navbar className="flight-Navbar" fluid fixedTop>
        <NavbarHeader>
          <NavbarBrand className="flight-Navbar-brand">
            <Link to="/"/>
          </NavbarBrand>
        </NavbarHeader>
        <Nav>
          <NavItemLink to="/">
            Alces Access Manager
          </NavItemLink>
        </Nav>
      </Navbar>
    )
  }
}

export default Header;
