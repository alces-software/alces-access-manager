/*=============================================================================
 * Copyright (C) 2015-2016 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'containers/App';
import ClusterComponentsPage from 'containers/ClusterComponentsPage';
import ClusterDashboardPageContainer from 'containers/ClusterDashboardPageContainer';
import ClustersPageContainer from 'containers/ClustersPageContainer';
import ConfirmEmailPageContainer from 'containers/ConfirmEmailPageContainer';
import ConnectPage from 'components/ConnectPage';
import EditAccountPageContainer from 'containers/EditAccountPageContainer';
import EditComponentsPageContainer from 'containers/EditComponentsPageContainer';
import EditEnvironmentsPageContainer from 'containers/EditEnvironmentsPageContainer';
import EnvironmentsPageContainer from 'containers/EnvironmentsPageContainer';
import InvitationsPageContainer from 'containers/InvitationsPageContainer';
import LandingPageContainer from 'containers/LandingPageContainer';
import LaunchClusterPageContainer from 'containers/LaunchClusterPageContainer';
import LearnMorePage from 'components/pages/LearnMorePage';
import NewComponentsPageContainer from 'containers/NewComponentsPageContainer';
import NewEnvironmentsPageContainer from 'containers/NewEnvironmentsPageContainer';
import PrivacyPolicyPage from 'components/PrivacyPolicyPage';
import SecurityPage from 'components/SecurityPage';
import ShareEnvironmentPageContainer from 'containers/ShareEnvironmentPageContainer';
import SignInPageContainer from 'containers/SignInPageContainer';
import SignUpPageContainer from 'containers/SignUpPageContainer';
import TermsOfServicePage from 'components/TermsOfServicePage';
import UserStartPage from 'components/UserStartPage';
import AdminStartPage from 'components/AdminStartPage';

import {authorize} from 'components/AuthorizedComponent';
import * as authorization from 'utils/authorization';
import { hasEnvironmentsSelector } from 'selectors/environmentsSelectors';

const hasNoEnvironments = function(state) {
  return !hasEnvironmentsSelector(state);
}

const hasEnvironments = function(state) {
  return hasEnvironmentsSelector(state);
}

const routes = <Route path="/" component={App}>
  <IndexRoute component={LandingPageContainer} />

  <Route path="learn-more" component={LearnMorePage} />
  <Route path="terms" component={TermsOfServicePage} />
  <Route path="privacy" component={PrivacyPolicyPage} />
  <Route path="security" component={SecurityPage} />

  <Route component={authorize(authorization.signedOut, authorization.redirectToLandingPage)}>
    <Route path="sign-in" component={SignInPageContainer} />
    <Route path="sign-up" component={SignUpPageContainer} />
    <Route path="sign-up/confirm-email" component={ConfirmEmailPageContainer} />
  </Route>

  <Route component={authorize(authorization.signedIn, authorization.redirectToSignIn)}>
    <Route component={authorize(hasNoEnvironments, authorization.redirectToLandingPage)}>
      <Route path="connect" component={ConnectPage} />
    </Route>
    <Route path="start" component={UserStartPage} />
    <Route path="admin" component={AdminStartPage} />
    <Route path="account/edit" component={EditAccountPageContainer} />
    <Route path="clusters" component={ClustersPageContainer}/>
    <Route path="clusters/launch" component={LaunchClusterPageContainer}/>
    <Route path="clusters/:clusterId" component={ClusterDashboardPageContainer}/>
    <Route path="environments" component={EnvironmentsPageContainer}/>
    <Route path="environments/new" component={NewEnvironmentsPageContainer}/>
    <Route path="environments/:environmentId/edit" component={EditEnvironmentsPageContainer}/>
    <Route path="environments/:environmentId/components" component={ClusterComponentsPage}/>
    <Route path="environments/:environmentId/components/new" component={NewComponentsPageContainer}/>
    <Route path="environments/share(/:environmentId)" component={ShareEnvironmentPageContainer}/>
    <Route path="invitations" component={InvitationsPageContainer}/>
    <Route component={authorize(hasEnvironments, authorization.redirectToLandingPage)}>
      <Route path="components/:componentId/edit" component={EditComponentsPageContainer}/>
      <Route path="components/new" component={NewComponentsPageContainer}/>
    </Route>
  </Route>

  <Redirect from="*" to="/" />
</Route>

export default routes;
