/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
/* Useful testing routines */

import * as formNames from 'forms/names';

export const emptyStore = {
  getState() {
    return {
      auth: {signingIn: false, signingOut: false},
      clusters: {data: {}, meta: {}},
      clusterComponents: {data: {}, meta: {}},
      environments: {data: {}, meta: {}},
      valetConfigurations: {data: {}, meta: {}},
      form: {[formNames.CLUSTER_COMPONENT_NEW]: {}}
    };
  },

  subscribe() {},
  dispatch() {}
}
