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
        <NoVNC url="ws://localhost:41361/websockify" password="LE94kYw5"/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
