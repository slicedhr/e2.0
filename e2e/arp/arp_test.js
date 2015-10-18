/* global describe, beforeEach, it, browser, expect */
'use strict';

var ArpPagePo = require('./arp.po');

describe('Arp page', function () {
  var arpPage;

  beforeEach(function () {
    arpPage = new ArpPagePo();
    browser.get('/#/arp');
  });

  it('should say ArpCtrl', function () {
    expect(arpPage.heading.getText()).toEqual('arp');
    expect(arpPage.text.getText()).toEqual('ArpCtrl');
  });
});
