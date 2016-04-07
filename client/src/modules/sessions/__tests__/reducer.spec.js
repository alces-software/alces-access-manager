
/* eslint-env mocha */
import {expect} from 'chai';

import * as reducerModule from '../reducer';

describe('sessions reducer', function() {
  describe('handleReceivedSessions', function() {
    beforeEach(function() {
      this.ip = '127.0.0.1';
      this.sessions = [{uuid: '1'}, {uuid: '2'}];
      this.loadSessionsAction = {
        meta: {
          payload: {
            cluster: {
              ip: this.ip,
            },
          },
        },
        payload: {
          sessions: this.sessions,
        },
      };
    });

    it('sets the sessions under the cluster IP', function() {
      const newState = reducerModule.handleReceivedSessions({}, this.loadSessionsAction)
      expect(newState).to.deep.equal({[this.ip]: this.sessions});
    });

    it('only sets sessions if different to existing', function() {
      const currentState = {[this.ip]: this.sessions};
      const newState = reducerModule.handleReceivedSessions(currentState, this.loadSessionsAction);
      expect(newState).to.equal(currentState);
    });
  });
});
