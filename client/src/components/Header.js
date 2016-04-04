
import _ from 'lodash';
import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router';

// Import these components directly to make Babel optimizations happy.  One of
// the optimization plugins we use for production builds doesn't like the use
// of `Navbar.Brand` in JSX elements.
// TODO: Do same in Aviator.
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';

import Icon from 'components/Icon';
import {NavItemLink} from 'components/Links';

class Header extends React.Component {
  render() {
    const {currentCluster, logout} = this.props;

    // We only show logout button when in the context for a cluster - doesn't
    // make sense to show otherwise.
    let navbarRight;
    if (currentCluster) {
      const logoutCluster = _.partial(logout, currentCluster);
      navbarRight = (
        <Nav pullRight>
          <NavItem onClick={logoutCluster}>
            Logout of {currentCluster.name} <Icon name="cluster-logout"/>
          </NavItem>
        </Nav>
      );
    }
    else {
      navbarRight = null;
    }

    return (
      <Navbar className="flight-Navbar" fluid fixedTop>
        <NavbarHeader>
          <NavbarBrand className="flight-Navbar-brand">
            <Link to="/"/>
          </NavbarBrand>
        </NavbarHeader>
        <NavbarCollapse>
          <Nav>
            <NavItemLink to="/">
              Alces Access Manager
            </NavItemLink>
          </Nav>
          {navbarRight}
        </NavbarCollapse>
      </Navbar>
    )
  }
}

export default Header;
