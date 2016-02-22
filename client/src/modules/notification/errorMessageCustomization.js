/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';

import * as authActionTypes from 'auth/actionTypes';
import * as clusterComponentActionTypes from 'clusterComponent/actionTypes';
import * as environmentActionTypes from 'environment/actionTypes';
import * as registrationActionTypes from 'registration/actionTypes';
import {ContactCustomerSupport} from 'components/CustomerSupport';

import MessageGenerator from "./MessageGenerator";

export const unexpectedErrorMessageGenerator = new MessageGenerator(
  'Unexpected error',
  <div>
    An unexpected error occurred while attempting to complete your
    request. <ContactCustomerSupport/>
  </div>
);

//
// Add default error message generators to the generators map.
//
export function setupDefaultErrorMessageGenerators(generatorsMap) {
  const serverUnavailableErrorMessageGenerator = new MessageGenerator(
    'Unable to communicate with server',
    <div>
      Flight was unable to complete your action as it was unable to
      communicate with the Flight web server; please check your
      internet connection and try again. <ContactCustomerSupport/>
    </div>
  );

  const unauthorizedErrorMessageGenerator = new MessageGenerator(
    'Unauthorized',
    'You are not authorized to perform this action.'
  );

  const unprocessableEntityErrorMessageGenerator = new MessageGenerator(
    'Action failed',
    `It was not possible to complete the action. ${correctErrorsText()}`
  );

  const serverErrorMessageGenerator = new MessageGenerator(
    'Unexpected error',
    <div>
      The Flight web server errored while attempting to complete your
      request. <ContactCustomerSupport/>
    </div>
  );

  generatorsMap.
    addGeneratorForCode(0,   serverUnavailableErrorMessageGenerator).
    addGeneratorForCode(401, unauthorizedErrorMessageGenerator).
    addGeneratorForCode(422, unprocessableEntityErrorMessageGenerator).
    addGeneratorForCode(500, serverErrorMessageGenerator).
    addUnexpectedGenerator(unexpectedErrorMessageGenerator);
}


//
// Customize the error generators for certain action types.
//
// XXX Perhaps this should be moved from here and we allow other modules to
// customize as they see fit.
//
export function addActionTypeCustomizations(generatorsMap) {
  generatorsMap.
    customizeMessage(
      "unexpected",
      authActionTypes.RETRIEVE_SESSION,
      {
        title: "Unable to retrieve your session",
        content: <div>
          An unexpected error occurred while attempting to retrieve your
          session. <ContactCustomerSupport/>
        </div>
      }
    ).

    customizeMessage(
      401,
      authActionTypes.SIGN_IN,
      {
        title: 'Authentication failure',
        content: "The provided username and/or password were incorrect. Please correct and try again."
      }
    ).

    customizeMessage(
      422,
      registrationActionTypes.REGISTER,
      {
        title: 'Registration failure',
        content: <div>
          It was not possible to create your account. {correctErrorsText()}
        </div>
      }
    ).

    customizeMessage(
      422,
      clusterComponentActionTypes.CREATE,
      {
        title: 'Cluster component creation failed',
        content: <div>
          It was not possible to create your cluster component.
          {correctErrorsText()}
        </div>
      }
    ).

    customizeMessage(
      422,
      environmentActionTypes.CREATE,
      {
        title: 'Environment creation failed',
        content: <div>
          It was not possible to create your environment. {correctErrorsText()}
        </div>
      }
    );
}


function correctErrorsText() {
  return 'Please correct the errors and try again.';
}
