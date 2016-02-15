/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('epsForm', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/eps-form-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<eps-form></eps-form>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().epsForm.name).toEqual('epsForm');
  });
});
