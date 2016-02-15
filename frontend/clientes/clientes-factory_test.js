/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Clientes', function () {
  var factory;

  beforeEach(module('clientes'));

  beforeEach(inject(function (Clientes) {
    factory = Clientes;
  }));

  it('should have someValue be Clientes', function () {
    expect(factory.someValue).toEqual('Clientes');
  });

  it('should have someMethod return Clientes', function () {
    expect(factory.someMethod()).toEqual('Clientes');
  });
});
