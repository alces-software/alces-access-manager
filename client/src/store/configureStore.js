
import { createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';

import DevTools from '../containers/DevTools';
import rootReducer from 'reducers';
import enhanceWithMiddleware from 'middleware';
import routes from 'routes';

const storeEnhancers = [
  enhanceWithMiddleware,
  reduxReactRouter({routes, createHistory}),
]

if (__PERSIST_STATE__) {
  storeEnhancers.push(
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  );
}
if (__DEVTOOLS__) {
  storeEnhancers.push(DevTools.instrument());
}

const storeEnhancer  = compose(...storeEnhancers);
const finalCreateStore = storeEnhancer(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (__DEVELOPMENT__ && module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
