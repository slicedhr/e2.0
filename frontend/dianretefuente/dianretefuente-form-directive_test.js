/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('dianretefuenteForm', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/dianretefuente-form-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<dianretefuente-form></dianretefuente-form>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().dianretefuenteForm.name).toEqual('dianretefuenteForm');
  });
});
