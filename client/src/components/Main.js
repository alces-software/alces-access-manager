require('normalize.css');
require('styles/App.css');

import React from 'react';

import NoVNC from 'components/NoVnc'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <NoVNC/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
