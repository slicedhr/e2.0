/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('mainMenu', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/main-menu-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<main-menu></main-menu>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().mainMenu.name).toEqual('mainMenu');
  });
});
