/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CotizacionesCtrl', function () {
  var ctrl;

  beforeEach(module('cotizaciones'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CotizacionesCtrl');
  }));

  it('should have ctrlName as CotizacionesCtrl', function () {
    expect(ctrl.ctrlName).toEqual('CotizacionesCtrl');
  });
});
