(function () {
  'use strict';

  /**
   * @ngdoc filter
   * @name home.filter:getByID
   *
   * @description
   *
   * @param {Array} input The array to filter
   * @returns {Array} The filtered array
   *
   */
  angular
    .module('home')
    .filter('getByID', getByID);

  function getByID() {

    return function(input, id) {

      let i = 0, len = input.length;

      for (; i < len; i++) 

        if (+input[i].id == +id)

          return input[i];
        

      return null;

    }
  }


}());
