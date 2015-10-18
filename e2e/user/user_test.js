/* global describe, beforeEach, it, browser, expect */
'use strict';

var UserPagePo = require('./user.po');

describe('User page', function () {
  var userPage;

  beforeEach(function () {
    userPage = new UserPagePo();
    browser.get('/#/user');
  });

  it('should say UserCtrl', function () {
    expect(userPage.heading.getText()).toEqual('user');
    expect(userPage.text.getText()).toEqual('UserCtrl');
  });
});
