/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import * as types from './actionTypes';

export function displayErrorModal(action, response) {
  return {
    type: types.ADD_ERROR_MODAL,
    payload: { action: action, response: response }
  }
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL
  }
}

export function displayInfoModal(message) {
  return {
    type: types.ADD_INFO_MODAL,
    payload: message
  }
}
