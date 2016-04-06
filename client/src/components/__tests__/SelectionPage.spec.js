
/* eslint-env mocha */
import {expect} from 'chai';
import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';

import SelectionPage from 'components/SelectionPage';

describe('SelectionPage', function() {
  describe('shouldComponentupdate', function() {
    beforeEach(function() {
      this.props = {
        header: <div/>,
        items: [],
        keyProp: 'id',
        selectionBoxComponent: 'div',
        loggingOut: false,
      }

      this.selectionPage =
        () => renderIntoDocument(<SelectionPage {...this.props}/>);
    })

    it ("doesn't update when logging out", function() {
      const nextProps = {loggingOut: true};
      const shouldUpdate = this.selectionPage().loggingOutShouldUpdate(nextProps);
      expect(shouldUpdate).to.be.false;
    });

    it ('updates when not logging out', function() {
      const nextProps = {loggingOut: false};
      const shouldUpdate = this.selectionPage().loggingOutShouldUpdate(nextProps);
      expect(shouldUpdate).to.be.true;
    });

    it ("only updates when items are different", function() {
      const items = [{id: 1}, {id: 2}, {id: 3}];
      this.props = {...this.props, items};

      const selectionPage = this.selectionPage();
      expect(selectionPage.itemsDifferentShouldUpdate({items})).to.be.false;

      const newItems = [{id: 4}];
      expect(selectionPage.itemsDifferentShouldUpdate({items: newItems})).to.be.true;
    });
  });
});
