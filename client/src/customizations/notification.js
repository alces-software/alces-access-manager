
import React from 'react';
import _ from 'lodash'
import {
  errorGeneratorsMap,
} from 'flight-common/modules/notification/messageGeneration'
import {
  setupDefaultErrorMessageGenerators,
} from 'flight-common/modules/notification/errorMessageCustomization'
import {ContactCustomerSupport} from 'flight-common'

import * as clusterActionTypes from 'clusters/actionTypes';
import * as sessionActionTypes from 'sessions/actionTypes';

setupDefaultErrorMessageGenerators(errorGeneratorsMap, 'Alces Access Manager')
addActionTypeCustomizations(errorGeneratorsMap)

function addActionTypeCustomizations(generatorsMap) {
  generatorsMap.

    customizeMessage(
      401,
      clusterActionTypes.AUTHENTICATE,
      {
        title: 'Authentication failure',
        content: `The provided username and/or password are incorrect for the
          selected cluster. Please correct these and try again.`,
      }
    );

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
        sessionActionTypes.RELOAD_SESSIONS,
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
