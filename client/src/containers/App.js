/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as authActions from 'auth/actions';
import * as invitationActions from 'invitation/actions';
import * as notificationActions from 'notification/actions';
import {appSelectors} from "selectors/appSelectors";

import NotificationModals from 'notification/components/NotificationModals';
import Header from 'components/Header';
import Footer from 'components/Footer';
import LoadingPage from 'components/LoadingPage';

if (!__TEST__){
require("styles/main.scss");
}

class App extends React.Component {
  render() {
    return (
      <div className="stickyFooter-wrapper-wrapper">
        <div className="flight">
          <NotificationModals
            showingModal={this.props.notifications.showingModal}
            onCloseNotification={this.props.closeNotificationModal}
            currentModal={this.props.notifications.currentModal}
            exitingModal={this.props.notifications.exitingModal}
          />
          <Header
            onAcceptInvitation={this.props.acceptInvitation}
            onDeclineInvitation={this.props.declineInvitation}
            account={this.props.account}
            clusters={this.props.clusters}
            doSignOut={this.props.signOut}
            hasEnvironments={this.props.hasEnvironments}
            pendingInvitations={this.props.pendingInvitations}
            sessionLoaded={this.props.loading.loaded}
          />
          <div className="pageContainer">
            {this.page()}
          </div>
        </div>
        <Footer ref={(footer) => this.footer = footer}/>
      </div>
    )
  }

  page() {
    const {loading: {loaded}} = this.props;

    let key;
    if (loaded) {
      key = this.props.location.pathname;
    } else {
      key = 'loadingPage';
    }

    return (
      <ReactCSSTransitionGroup
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionName="fade-in-out"
        >
        <FadeTransitionHandler key={key} className="page" footer={this.footer}>
          {loaded ? this.props.children : <LoadingPage/>}
        </FadeTransitionHandler>
      </ReactCSSTransitionGroup>
    )
  }
}

class FadeTransitionHandler extends React.Component {
  componentDidMount() {
    // A page is about to fade in.
    const footerEl = ReactDOM.findDOMNode(this.props.footer);
    if (footerEl) {
      footerEl.classList.add("footer--animate");
    }
  }

  componentWillUnmount() {
    // A page has just faded out.
    const footerEl = ReactDOM.findDOMNode(this.props.footer);
    if (footerEl) {
      footerEl.classList.remove("footer--animate");
    }
  }

  render() {
    return (
      <div className="page">
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  appSelectors,
  {
    acceptInvitation: invitationActions.acceptInvitation,
    declineInvitation: invitationActions.declineInvitation,
    signOut: authActions.signOut,
    closeNotificationModal: notificationActions.closeModal
  }
)(App);
