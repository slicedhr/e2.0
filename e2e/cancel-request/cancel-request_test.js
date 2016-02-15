/* global describe, beforeEach, it, browser, expect */
'use strict';

var CancelRequestPagePo = require('./cancel-request.po');

describe('Cancel request page', function () {
  var cancelRequestPage;

  beforeEach(function () {
    cancelRequestPage = new CancelRequestPagePo();
    browser.get('/#/cancel-request');
  });

  it('should say CancelRequestCtrl', function () {
    expect(cancelRequestPage.heading.getText()).toEqual('cancelRequest');
    expect(cancelRequestPage.text.getText()).toEqual('CancelRequestCtrl');
  });
});
