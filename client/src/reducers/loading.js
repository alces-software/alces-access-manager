/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import {resolve} from 'redux-simple-promise';

import {RETRIEVE_SESSION} from 'auth/actionTypes';

const initialState = {
  loaded: false
}

export default function reducer(state=initialState, action) {
  switch (action.type) {

    case resolve(RETRIEVE_SESSION):
      return {...state, loaded: true}

    default:
      return state
  }
}
