/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('IvaCtrl', function () {
  var ctrl;

  beforeEach(module('iva'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('IvaCtrl');
  }));

  it('should have ctrlName as IvaCtrl', function () {
    expect(ctrl.ctrlName).toEqual('IvaCtrl');
  });
});
