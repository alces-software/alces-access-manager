
import _ from 'lodash';
import React from 'react';
import { Nav, NavItem} from 'react-bootstrap';
import {Icon} from 'flight-common';

import {NavItemLink} from 'components/Links';

class NavbarContent extends React.Component {
  render() {
    const {
      currentCluster,
      logout,
      homePageLink,
    } = this.props;

    // We only show logout button when in the context for a cluster - doesn't
    // make sense to show otherwise.
    let navbarRight;
    if (currentCluster) {
      const logoutCluster = _.partial(logout, currentCluster);
      navbarRight = (
        <Nav pullRight>
          <NavItem onClick={logoutCluster}>
            Logout of {currentCluster.name} <Icon name="aam-cluster-logout"/>
          </NavItem>
        </Nav>
      );
    }
    else {
      navbarRight = null;
    }

    return (
      <div>
        <Nav>
          <NavItemLink to={homePageLink}>
            Alces Access Manager
          </NavItemLink>
        </Nav>
        {navbarRight}
      </div>
    );
  }
}

export default NavbarContent;
