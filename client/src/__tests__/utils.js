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
