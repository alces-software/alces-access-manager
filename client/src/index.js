
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import {loadSessionData} from 'ui/actions';
import configureStore from 'store/configureStore';
import routes from 'routes';
import {customizeNotificationMessages} from 'customizations/notification';

const store = configureStore();

store.dispatch(loadSessionData());
customizeNotificationMessages(store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ReduxRouter>{routes}</ReduxRouter>
    </div>
  </Provider>,
  document.getElementById('root')
);
