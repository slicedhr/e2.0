/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ProductosCtrl', function () {
  var ctrl;

  beforeEach(module('productos'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ProductosCtrl');
  }));

  it('should have ctrlName as ProductosCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ProductosCtrl');
  });
});
