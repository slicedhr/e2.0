/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('MediosdepagoCtrl', function () {
  var ctrl;

  beforeEach(module('mediosdepago'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('MediosdepagoCtrl');
  }));

  it('should have ctrlName as MediosdepagoCtrl', function () {
    expect(ctrl.ctrlName).toEqual('MediosdepagoCtrl');
  });
});
