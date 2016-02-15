/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('listSeguimientos', function () {
  var scope
    , element;

  beforeEach(module('clientes', 'clientes/list-seguimientos-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<list-seguimientos></list-seguimientos>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().listSeguimientos.name).toEqual('listSeguimientos');
  });
});
