/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EpsCtrl', function () {
  var ctrl;

  beforeEach(module('eps'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EpsCtrl');
  }));

  it('should have ctrlName as EpsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('EpsCtrl');
  });
});
