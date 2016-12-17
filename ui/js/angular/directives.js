quotesApp.directive('pieChart', ['dashboardService', function (dashboardService) {
    return {
        restrict: 'A',
        scope: {
            data: '='
        },
        link: function (scope, element, attrs) {
            dashboardService.drawPieChart(element, scope.data);
        }
    }
}]);

quotesApp.directive('select2', ['globalService', function (globalService) {
    return {
        restrict: 'A',
        scope: {
            data: '='
        },
        link: function (scope, element, attrs) {
            globalService.applySelect2(element);
        }
    }
}]);

quotesApp.directive('filter', function ($resource) {
    return {
        restrict: 'E',
        scope: {
            items: '=items',
            type: '@type',
        },
        templateUrl: '/api/templates/filter.html',
        link: function (scope, element, attrs) {
            scope.updateParams = scope.$parent.updateParams;
            scope.editFilter = function (item) {
                item.edit = true;
            };
            scope.finishEditFilter = function (item) {
                item.edit = false;
                var updateResource = $resource('/api/' + scope.type + '/');
                // TODO: Finish filter update.

            };
            scope.handleEnterKey = function (keyEvent, item) {
                if (keyEvent.which == 13) {
                    scope.finishEditFilter(item);
                }
            }
        }
    }
});

quotesApp.directive('syncFocusWith', function ($timeout, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            focusValue: "=syncFocusWith",
            ngShow: "="
        },
        link: function (scope, $element, attrs) {
            scope.$watch('focusValue', function (currentValue, previousValue) {
                setTimeout(function () {
                    $element[0].focus();
                }, 1);
            })
        }
    }
});
