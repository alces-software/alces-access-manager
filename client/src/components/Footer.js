/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        Alces Flight <span className="flightFooter-copyright">&copy;</span> 2015&nbsp;
        <a className="flightFooter-us" href="http://www.alces-software.com">
          Alces&nbsp;Software&nbsp;Ltd
        </a>
      </footer>
    )
  }
}

export default Footer;
