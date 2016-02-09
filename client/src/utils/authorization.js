/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import {replaceState} from 'redux-router'

export function signedIn(store) {
  return !!store.auth.account;
}

export function signedOut(store) {
  return !signedIn(store);
}

export function redirectToSignIn() {
  // Redirect to sign in page only if not in the process of signing out;
  // otherwise we end up on the sign in page instead of the landing page.
  if (!this.props.auth.signingOut) {
    this.props.dispatch(replaceState(
      {nextRoute: this.props.location.pathname},
      "/sign-in"
    ));
  }
}

export function redirectToLandingPage() {
  // Redirect to landing page only if not in the process of signing in;
  // otherwise screen will briefly flash landing page before redirecting to
  // correct next page, since sign in takes place on sign in page and as soon
  // as account has been retrieved AuthorizedComponent will determine that we
  // shouldn't be able to be there.
  if (!this.props.auth.signingIn) {
    this.props.dispatch(replaceState(null, '/'));
  }
}

export function nextRoute(routerState) {
  const locationState = routerState.location.state;
  if (locationState !== undefined && locationState !== null) {
    return locationState.nextRoute;
  }
}
