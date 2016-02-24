
import React from 'react';

import NoVnc from 'components/NoVnc';

export default class VncSessionPage extends React.Component {
  render() {
    const {cluster, session} = this.props;
    const url = `ws://${cluster.ip}:${session.websocket}/websockify`

    return (
      <div className="container">
        <NoVnc url={url} password={session.password}/>
      </div>
    );
  }
}
