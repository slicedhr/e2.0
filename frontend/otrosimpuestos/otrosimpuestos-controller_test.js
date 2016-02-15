/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('OtrosimpuestosCtrl', function () {
  var ctrl;

  beforeEach(module('otrosimpuestos'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('OtrosimpuestosCtrl');
  }));

  it('should have ctrlName as OtrosimpuestosCtrl', function () {
    expect(ctrl.ctrlName).toEqual('OtrosimpuestosCtrl');
  });
});
