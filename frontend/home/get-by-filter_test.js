/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('getBy', function () {
  beforeEach(module('home'));

  it('should filter our numbers not greater than 3', inject(function ($filter) {
    expect($filter('getBy')([1, 2, 3, 4])).toEqual([4]);
  }));
});
