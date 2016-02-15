/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CategoriasproductosCtrl', function () {
  var ctrl;

  beforeEach(module('categoriasproductos'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CategoriasproductosCtrl');
  }));

  it('should have ctrlName as CategoriasproductosCtrl', function () {
    expect(ctrl.ctrlName).toEqual('CategoriasproductosCtrl');
  });
});
