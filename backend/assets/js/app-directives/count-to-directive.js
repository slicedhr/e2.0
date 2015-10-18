'use strict';

(function () {
    'use strict';
    angular.module('enterprise').directive('countTo', CountTo);

    function CountTo($timeout) {
        return {
            replace: false,
            scope: true,
            link: function link(scope, element, attrs) {

                var e = element[0];
                var num, refreshInterval, duration, steps, step, countTo, value, increment;

                var calculate = function calculate() {
                    refreshInterval = 30;
                    step = 0;
                    scope.timoutId = null;
                    countTo = parseInt(attrs.countTo) || 0;
                    scope.value = parseInt(attrs.value, 10) || 0;
                    duration = parseFloat(attrs.duration) * 1000 || 0;

                    steps = Math.ceil(duration / refreshInterval);
                    increment = (countTo - scope.value) / steps;
                    num = scope.value;
                };

                var tick = function tick() {
                    scope.timoutId = $timeout(function () {
                        num += increment;
                        step++;
                        if (step >= steps) {
                            $timeout.cancel(scope.timoutId);
                            num = countTo;
                            e.textContent = countTo;
                        } else {
                            e.textContent = Math.round(num);
                            tick();
                        }
                    }, refreshInterval);
                };

                var start = function start() {

                    if (scope.timoutId) $timeout.cancel(scope.timoutId);

                    calculate();

                    tick();
                };

                attrs.$observe('countTo', function (val) {
                    if (val) start();
                });

                attrs.$observe('value', function (val) {
                    start();
                });

                return true;
            }
        };
    }
})();
//# sourceMappingURL=count-to-directive.js.map
