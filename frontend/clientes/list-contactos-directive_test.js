/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('listContactos', function () {
  var scope
    , element;

  beforeEach(module('clientes', 'clientes/list-contactos-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<list-contactos></list-contactos>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().listContactos.name).toEqual('listContactos');
  });
});
