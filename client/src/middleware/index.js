
import promiseMiddleware from 'redux-simple-promise';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import apiRequestMiddleware from './apiRequests';
import logger from './logger';

const enhanceWithMiddleware = applyMiddleware(
    apiRequestMiddleware,
    promiseMiddleware(),
    thunk,
    logger
);

export default enhanceWithMiddleware;
export { logger };
