/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import promiseMiddleware from 'redux-simple-promise';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import apiRequestMiddleware from './apiRequests';
import logger from './logger';

const enhanceWithMiddleware = applyMiddleware(
    // apiRequestMiddleware,
    promiseMiddleware(),
    thunk,
    logger
);

export default enhanceWithMiddleware;
export { logger };
