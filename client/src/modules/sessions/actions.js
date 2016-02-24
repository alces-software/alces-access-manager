
import * as actionTypes from './actionTypes';

export function loadSessions(clusterIp) {
  return {
    type: actionTypes.LOAD_SESSIONS,
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${clusterIp}/sessions`,
          method: 'get',
        },
      },
    },
    payload: {
      clusterIp,
    },
  }
}
