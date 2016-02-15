/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('slug', function () {
  beforeEach(module('home'));

  it('should filter our numbers not greater than 3', inject(function ($filter) {
    expect($filter('slug')([1, 2, 3, 4])).toEqual([4]);
  }));
});
