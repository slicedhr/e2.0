/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('PaisesCtrl', function () {
  var ctrl;

  beforeEach(module('paises'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('PaisesCtrl');
  }));

  it('should have ctrlName as PaisesCtrl', function () {
    expect(ctrl.ctrlName).toEqual('PaisesCtrl');
  });
});
