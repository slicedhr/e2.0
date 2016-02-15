/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ClientesCtrl', function () {
  var ctrl;

  beforeEach(module('clientes'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ClientesCtrl');
  }));

  it('should have ctrlName as ClientesCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ClientesCtrl');
  });
});
