/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('VigenciaCtrl', function () {
  var ctrl;

  beforeEach(module('vigencia'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('VigenciaCtrl');
  }));

  it('should have ctrlName as VigenciaCtrl', function () {
    expect(ctrl.ctrlName).toEqual('VigenciaCtrl');
  });
});
