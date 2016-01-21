require('normalize.css');
require('styles/App.css');

import React from 'react';

import NoVNC from 'components/NoVnc'

class AppComponent extends React.Component {
  render() {
    // Note: /websocket suffix required as specified here:
    // http://procbits.com/2013/10/09/connecting-to-a-sockjs-server-from-native-html5-websocket.
    return (
      <div className="index">
        <NoVNC host="localhost" port={6080} password="" path="websockify"/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
