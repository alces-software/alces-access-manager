
import _ from 'lodash';
import React, {PropTypes} from 'react';
import { Nav, NavItem} from 'react-bootstrap';
import {Header as FlightHeader, Icon} from 'flight-common';

import {NavItemLink} from 'components/Links';

class Header extends React.Component {
  render() {
    const {productName} = this.props;

    return (
      <FlightHeader productName={productName} homePageLink={this.homePageLink()} >
        <Nav>
          <NavItemLink to={this.homePageLink()}>
            {productName}
          </NavItemLink>
        </Nav>
        {this.navbarRight()}
      </FlightHeader>
    );
  }

  homePageLink() {
    const {singleCluster, singleClusterMode} = this.props;
    if (singleClusterMode && singleCluster.authenticated_username) {
      // When authed for the single cluster in single cluster mode, we treat
      // the cluster's sessions page as the home page.
      return `/cluster/${singleCluster.ip}`
    }
    else {
      return '/';
    }
  }

  navbarRight() {
    const {currentCluster, logout} = this.props;

    // We only show logout button when in the context for a cluster - doesn't
    // make sense to show otherwise.
    if (currentCluster) {
      const logoutCluster = _.partial(logout, currentCluster);
      return (
        <Nav pullRight>
          <NavItem onClick={logoutCluster}>
            Logout of {currentCluster.name} <Icon name="aam-cluster-logout"/>
          </NavItem>
        </Nav>
      );
    }
    else {
      return null;
    }

  }
}

Header.propTypes = {
  currentCluster: PropTypes.object,
  logout: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
  singleCluster: PropTypes.object,
  singleClusterMode: PropTypes.bool.isRequired,
}

export default Header;
