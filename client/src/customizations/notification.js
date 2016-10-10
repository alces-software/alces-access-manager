
import React from 'react';
import _ from 'lodash'
import {
  setupDefaultErrorMessageGenerators,
} from 'flight-common/lib/modules/notification/errorMessageCustomization'
import {CustomerSupportLink, ContactCustomerSupport} from 'flight-common'

import * as clusterActionTypes from 'clusters/actionTypes';
import * as sessionActionTypes from 'sessions/actionTypes';

export function customizeNotificationMessages(store) {
  const {errorGeneratorsMap} = store.getState().notifications;

  setupDefaultErrorMessageGenerators(errorGeneratorsMap, 'Alces Access Manager')
  addActionTypeCustomizations(errorGeneratorsMap)
}

function addActionTypeCustomizations(generatorsMap) {
  addAuthenticationFailureCustomization(generatorsMap)
  addDaemonUnavailableCustomizations(generatorsMap)
  addLaunchTimeoutCustomization(generatorsMap)
}

function addAuthenticationFailureCustomization(generatorsMap) {
  generatorsMap.customizeMessage(
    401,
    clusterActionTypes.AUTHENTICATE,
    {
      title: 'Authentication failure',
      content: `The provided username and/or password are incorrect for the
        selected cluster. Please correct these and try again.`,
    }
  );
}

function addDaemonUnavailableCustomizations(generatorsMap) {
  const daemonUnavailableMessage = {
    title: 'Daemon unavailable',
    content: (message) => {
      const {cluster} = message.action.payload;
      return (
        <div>
          <p>
            The Alces Access Manager Daemon for <em>{cluster.name}</em> did
            not respond.
          </p>
          <p>
            Please ensure the daemon is running at the correct address
            (<em>{cluster.ip}:{cluster.auth_port}</em>), and is accessible to
            the Alces Access Manager.
          </p>
          <p>
            <ContactCustomerSupport/>
          </p>
        </div>
      )
    },
  }

  _.each(
    [
      clusterActionTypes.AUTHENTICATE,
      sessionActionTypes.LOAD_SESSIONS,
      sessionActionTypes.LAUNCH,
  ],
  (action) => {
    generatorsMap.customizeMessage(
      502, // bad gateway - i.e. daemon not running/reachable.
      action,
      daemonUnavailableMessage
    );
  });
}

function addLaunchTimeoutCustomization(generatorsMap) {
  const launchTimeoutMessage = {
    title: 'Timed out while launching session',
    content: (
      <div>
        <p>
          Your session is taking an unusually long time to launch; your
          cluster may be particularly busy.
        </p>
        <p>
          Your session should still launch eventually, please contact the
          {' '}<CustomerSupportLink /> team if it does not.
        </p>
      </div>
    ),
  }

  generatorsMap.customizeMessage(
    504, // gateway timeout
    sessionActionTypes.LAUNCH,
    launchTimeoutMessage
  )
}
