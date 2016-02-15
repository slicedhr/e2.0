/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ArpCtrl', function () {
  var ctrl;

  beforeEach(module('arp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ArpCtrl');
  }));

  it('should have ctrlName as ArpCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ArpCtrl');
  });
});
