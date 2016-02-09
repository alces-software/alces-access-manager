/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import { pushState } from 'redux-router';

export function redirectTo(redirectPath) {
  return pushState(null, redirectPath);
}
