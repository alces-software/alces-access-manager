
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Footer, LoadingPage} from 'flight-common';
import NotificationModals from 'flight-common/modules/notification/components/NotificationModals';

import * as clusterActions from 'clusters/actions';
import Header from 'components/Header';
import {appSelector} from 'selectors';

if (!__TEST__){
  require("styles/main.scss");
}

class App extends React.Component {
  render() {
    const {
      notifications: {showingModal, currentModal, exitingModal},
    } = this.props;

    return (
      <div className="stickyFooter-wrapper-wrapper">
        <div className="flight">
          <NotificationModals
            showingModal={showingModal}
            currentModal={currentModal}
            exitingModal={exitingModal}
          />
          <Header
            productName={this.productName()}
            {...this.props}
          />
          <div className="pageContainer">
            {this.page()}
          </div>
        </div>
        <Footer
          productName={this.productName()}
          ref={(footer) => this.footer = footer}
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

    const pageOrLoadingPage = loaded ?
      this.props.children
    :
      <LoadingPage productName={this.productName()}/>;

    return (
      <ReactCSSTransitionGroup
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionName="fade-in-out"
        >
        <FadeTransitionHandler key={key} className="page" footer={this.footer}>
          {pageOrLoadingPage}
        </FadeTransitionHandler>
      </ReactCSSTransitionGroup>
    )
  }

  productName() {
    return "Alces Access Manager";
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
    logout: clusterActions.logout,
  }
)(App);
