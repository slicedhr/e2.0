/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TerminosdepagoCtrl', function () {
  var ctrl;

  beforeEach(module('terminosdepago'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TerminosdepagoCtrl');
  }));

  it('should have ctrlName as TerminosdepagoCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TerminosdepagoCtrl');
  });
});
