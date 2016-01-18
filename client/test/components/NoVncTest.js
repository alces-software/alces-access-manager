/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import NoVnc from 'components//NoVnc.js';

describe('NoVnc', () => {
  let component;

  beforeEach(() => {
    component = createComponent(NoVnc);
  });
});
