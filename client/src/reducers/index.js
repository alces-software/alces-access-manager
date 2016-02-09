/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import _ from 'lodash';

// Reducers:
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import clusters from 'cluster/reducer';
import clusterComponents from 'clusterComponent/reducer';
import clusterNodes from 'clusterNode/reducer';
import environments from 'environment/reducer';
import addressPools from 'addressPool/reducer';
import images from 'image/reducer';
import invitations from 'invitation/reducer';
import flavors from 'flavor/reducer';
import networks from 'network/reducer';
import securityGroups from 'securityGroup/reducer';
import auth from 'auth/reducer';
import registrations from 'registration/reducer';
import valetConfigurations from 'valetConfiguration/reducer';
import notifications from 'notification/reducer';
import form from 'forms/reducer';
import loading from './loading';
import {reducer as jsonApiReducer} from "jsonApi/reducer";

import {CLEAN_SESSION} from 'auth/actionTypes';

// Reducers for state to be reset to initial state when clearing app state
// on sign out.
const unpreservedStateReducers = {
  auth,
  clusters,
  clusterComponents,
  clusterNodes,
  environments,
  addressPools,
  images,
  invitations,
  flavors,
  networks,
  securityGroups,
  registrations,
  valetConfigurations,
  notifications,
  form,
  loading
};

// Reducers for state to be preserved when clearing app state on sign out
// (currently just router state is preserved, otherwise page refresh occurs
// after sign out).
const preservedStateReducers = {
  router: routerStateReducer
}

const combinedReducers = combineReducers({
  ...unpreservedStateReducers,
  ...preservedStateReducers
})

function reduceWithJsonApiResourceInclusion(state, action) {
  const newState = combinedReducers(state, action);
  return jsonApiReducer(newState, action);
}

export default function rootReducer(state, action) {
  let inputState;

  if (action.type === CLEAN_SESSION) {
    // Input state to rest of reducers will just be the state to preserve after
    // sign out; the rest of the state will be re-initialized to its initial
    // state by reducers for each section.
    inputState = _.pick(state, _.keys(preservedStateReducers));
  }
  else {
    inputState = state;
  }

  return reduceWithJsonApiResourceInclusion(inputState, action);
}
