/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('listCotizaciones', function () {
  var scope
    , element;

  beforeEach(module('clientes', 'clientes/list-cotizaciones-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<list-cotizaciones></list-cotizaciones>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().listCotizaciones.name).toEqual('listCotizaciones');
  });
});
