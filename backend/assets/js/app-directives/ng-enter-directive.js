'use strict';

(function () {
	'use strict';
	angular.module('enterprise').directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if (event.which === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.ngEnter);
					});

					event.preventDefault();
				}
			});
		};
	});
})();
//# sourceMappingURL=ng-enter-directive.js.map
