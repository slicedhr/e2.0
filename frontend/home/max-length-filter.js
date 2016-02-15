(function () {
  'use strict';

  /**
   * @ngdoc filter
   * @name home.filter:maxLength
   *
   * @description
   *
   * @param {Array} input The array to filter
   * @returns {Array} The filtered array
   *
   */
  angular
    .module('home')
    .filter('maxLength', maxLength);

  function maxLength() {
    return (text, max) => {

          if(text != null)
            
            return text.length > max ? text.substring(0, max) + "..." : max 
            
      
          
      }

  }
}());
