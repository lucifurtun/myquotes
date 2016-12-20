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

            if (!scope.$parent.user_id) {
                scope.editFilter = function (item) {
                    item.edit = true;
                };
                scope.finishEditFilter = function (item) {
                    item.edit = false;
                    var settings = {patch: {method: 'PATCH'}};
                    var updateResource = $resource('/api/' + scope.type + '/:id/', {id: item.id}, settings);
                    updateResource.patch(item);

                };
                scope.handleEnterKey = function (keyEvent, item) {
                    if (keyEvent.which == 13) {
                        // scope.finishEditFilter(item);
                        keyEvent.target.blur();
                    }
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
