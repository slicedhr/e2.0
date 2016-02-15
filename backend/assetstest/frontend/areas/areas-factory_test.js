/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Areas', function () {
  var factory;

  beforeEach(module('areas'));

  beforeEach(inject(function (Areas) {
    factory = Areas;
  }));

  it('should have someValue be Areas', function () {
    expect(factory.someValue).toEqual('Areas');
  });

  it('should have someMethod return Areas', function () {
    expect(factory.someMethod()).toEqual('Areas');
  });
});
