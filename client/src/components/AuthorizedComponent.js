/*=============================================================================
 * Copyright (C) 2015-2016 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import {connect} from 'react-redux';

// Inspired by https://github.com/joshgeller/react-redux-jwt-auth-example.
//
// Creates an AuthorizedComponent, which denies access to its children based on
// the success or failure of the given authorizationFunction; when this fails
// the authorizationFailedHandler will be bound to the component and executed.
export function authorize(authorizationFunction, authorizationFailedHandler) {

  class AuthorizedComponent extends React.Component {
    authorized() {
      return authorizationFunction(this.props);
    }

    componentWillMount() {
      this.handleIfUnauthorized();
    }

    componentWillReceiveProps(nextProps) {
      const authChanged = this.props.auth !== nextProps.auth;
      const envsChanged = this.props.environments !== nextProps.environments;

      if (authChanged || envsChanged) {
        this.handleIfUnauthorized();
      }
    }

    handleIfUnauthorized() {
      if (!this.authorized()) {
        authorizationFailedHandler.bind(this)();
      }
    }

    render() {
      return (
        <div>
          { this.authorized() ? this.props.children : null }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
    environments: state.environments
  });

  return connect(mapStateToProps)(AuthorizedComponent);
}
