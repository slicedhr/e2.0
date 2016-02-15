/* global describe, beforeEach, it, browser, expect */
'use strict';

var CancalRequestPagePo = require('./cancal-request.po');

describe('Cancal request page', function () {
  var cancalRequestPage;

  beforeEach(function () {
    cancalRequestPage = new CancalRequestPagePo();
    browser.get('/#/cancal-request');
  });

  it('should say CancalRequestCtrl', function () {
    expect(cancalRequestPage.heading.getText()).toEqual('cancalRequest');
    expect(cancalRequestPage.text.getText()).toEqual('CancalRequestCtrl');
  });
});
