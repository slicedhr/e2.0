/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('AreasCtrl', function () {
  var ctrl;

  beforeEach(module('areas'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('AreasCtrl');
  }));

  it('should have ctrlName as AreasCtrl', function () {
    expect(ctrl.ctrlName).toEqual('AreasCtrl');
  });
});
