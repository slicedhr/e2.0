/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CiudadesCtrl', function () {
  var ctrl;

  beforeEach(module('ciudades'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CiudadesCtrl');
  }));

  it('should have ctrlName as CiudadesCtrl', function () {
    expect(ctrl.ctrlName).toEqual('CiudadesCtrl');
  });
});
