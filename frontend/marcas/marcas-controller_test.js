/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('MarcasCtrl', function () {
  var ctrl;

  beforeEach(module('marcas'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('MarcasCtrl');
  }));

  it('should have ctrlName as MarcasCtrl', function () {
    expect(ctrl.ctrlName).toEqual('MarcasCtrl');
  });
});
