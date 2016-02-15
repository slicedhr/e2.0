/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('areasForm', function () {
  var scope
    , element;

  beforeEach(module('areas', 'areas/areas-form-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<areas-form></areas-form>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().areasForm.name).toEqual('areasForm');
  });
});
