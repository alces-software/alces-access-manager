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

import apiRequestMiddleware from './apiRequests';
import logger from './logger';
import form from 'forms/middleware';
import {
  messageMapperMiddleware as bayeuxMessageMapper,
  handleConnectionEvents as handleBayeuxConnectionEvents
} from 'bayeux/middleware';
import {
  createBayeuxConnectionEvents,
  messageMapperConfig as bayeuxMessageMapperConfig
} from './bayeuxConfig';

const enhanceWithMiddleware = applyMiddleware(
    apiRequestMiddleware,
    createBayeuxConnectionEvents,
    handleBayeuxConnectionEvents,
    bayeuxMessageMapper(bayeuxMessageMapperConfig),
    promiseMiddleware(),
    form,
    thunk,
    logger
);

export default enhanceWithMiddleware;
export { apiRequestMiddleware, logger };
