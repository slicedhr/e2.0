/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('arpForm', function () {
  var scope
    , element;

  beforeEach(module('arp', 'arp/arp-form-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<arp-form></arp-form>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().arpForm.name).toEqual('arpForm');
  });
});
