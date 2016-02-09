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
          <Header/>
          <div className="pageContainer">
            {this.page()}
          </div>
        </div>
        <Footer ref={(footer) => this.footer = footer}/>
      </div>
    )
  }

  page() {
    // const {loading: {loaded}} = this.props;

    let key;
    // if (loaded) {
    key = this.props.location.pathname;
    // } else {
    //   key = 'loadingPage';
    // }

    const loaded = true;

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

export default connect()(App);
