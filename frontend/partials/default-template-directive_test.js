/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('defaultTemplate', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/default-template-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<default-template></default-template>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().defaultTemplate.name).toEqual('defaultTemplate');
  });
});
