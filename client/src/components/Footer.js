/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        Alces Flight <span className="flightFooter-copyright">&copy;</span> 2015&nbsp;
        <a className="flightFooter-us" href="http://www.alces-software.com">
          Alces&nbsp;Software&nbsp;Ltd
        </a>
        {this.separatorBar()}
        <Link to="/privacy" className="flightFooter-link">Privacy Policy</Link>
        {this.separatorBar()}
        <Link to="/terms" className="flightFooter-link">Terms of Service</Link>
        {this.separatorBar()}
        <Link to="/security" className="flightFooter-link">Security</Link>
      </footer>
    )
  }

  separatorBar() {
    return (
      <span className="flightFooter-bar" />
    );
  }
}

export default Footer;
