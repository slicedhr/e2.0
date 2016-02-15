/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TiemposdeentregaCtrl', function () {
  var ctrl;

  beforeEach(module('tiemposdeentrega'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TiemposdeentregaCtrl');
  }));

  it('should have ctrlName as TiemposdeentregaCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TiemposdeentregaCtrl');
  });
});
