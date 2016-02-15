/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('timeline', function () {
  var scope
    , element;

  beforeEach(module('clientes', 'clientes/timeline-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<timeline></timeline>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().timeline.name).toEqual('timeline');
  });
});
