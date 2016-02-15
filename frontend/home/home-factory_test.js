/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Home', function () {
  var factory;

  beforeEach(module('home'));

  beforeEach(inject(function (Home) {
    factory = Home;
  }));

  it('should have someValue be Home', function () {
    expect(factory.someValue).toEqual('Home');
  });

  it('should have someMethod return Home', function () {
    expect(factory.someMethod()).toEqual('Home');
  });
});
