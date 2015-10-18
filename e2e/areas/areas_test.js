/* global describe, beforeEach, it, browser, expect */
'use strict';

var AreasPagePo = require('./areas.po');

describe('Areas page', function () {
  var areasPage;

  beforeEach(function () {
    areasPage = new AreasPagePo();
    browser.get('/#/areas');
  });

  it('should say AreasCtrl', function () {
    expect(areasPage.heading.getText()).toEqual('areas');
    expect(areasPage.text.getText()).toEqual('AreasCtrl');
  });
});
