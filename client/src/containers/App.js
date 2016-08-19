
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Footer, Header} from 'flight-common';

import NavbarContent from 'components/NavbarContent';
import * as clusterActions from 'clusters/actions';
import LoadingPage from 'components/LoadingPage';
import * as notificationActions from 'notification/actions';
import NotificationModals from 'notification/components/NotificationModals';
import {appSelector} from 'selectors';

if (!__TEST__){
  require("styles/main.scss");
}

class App extends React.Component {
  render() {
    const {
      notifications: {showingModal, currentModal, exitingModal},
      closeNotificationModal,
      singleClusterMode,
      singleCluster,
    } = this.props;

    let homePageLink = '/';
    if (singleClusterMode && singleCluster.authenticated_username) {
      // When authed for the single cluster in single cluster mode, we treat
      // the cluster's sessions page as the home page.
      homePageLink = `/cluster/${singleCluster.ip}`
    }

    return (
      <div className="stickyFooter-wrapper-wrapper">
        <div className="flight">
          <NotificationModals
            showingModal={showingModal}
            onCloseNotification={closeNotificationModal}
            currentModal={currentModal}
            exitingModal={exitingModal}
          />
          <Header
            productName="Alces Access Manager"
            homePageLink={homePageLink}
          >
            <NavbarContent homePageLink={homePageLink}/>
          </Header>
          <div className="pageContainer">
            {this.page()}
          </div>
        </div>
        <Footer
          productName="Alces Access Manager"
        />
      </div>
    )
  }

  page() {
    const {ui: {loaded}} = this.props;

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
  appSelector,
  {
    closeNotificationModal: notificationActions.closeModal,
    logout: clusterActions.logout,
  }
)(App);
