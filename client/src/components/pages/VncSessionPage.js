
import React from 'react';

import NoVnc from 'components/NoVnc';

export default class VncSessionPage extends React.Component {
  render() {
    return (
      <div className="container">
        <NoVnc url="ws://localhost:41361/websockify" password="FVo8GDge"/>
      </div>
    );
  }
}
