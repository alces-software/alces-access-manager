/*=============================================================================
 * Copyright (C) 2015-2016 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'containers/App';
import MainPageContainer from 'containers/MainPageContainer';

const routes = <Route path="/" component={App}>
  <IndexRoute component={MainPageContainer} />

  <Redirect from="*" to="/" />
</Route>

export default routes;
