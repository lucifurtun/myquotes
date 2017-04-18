quotesApp.directive('pieChart', ['dashboardService', function (dashboardService) {
    return {
        restrict: 'A',
        scope: {
            data: '='
        },
        link: function (scope, element, attrs) {
            dashboardService.drawPieChart(element, scope.data);
        }
    };
}]);

quotesApp.directive('select2', ['globalService', function (globalService) {
    return {
        restrict: 'A',
        scope: {
            data: '='
        },
        link: function (scope, element, attrs) {
            globalService.applySelect2(scope, element, attrs);
        }
    };
}]);

quotesApp.directive('filter', function ($resource) {
    return {
        restrict: 'E',
        scope: {
            items: '=items',
            type: '@type'
        },
        templateUrl: '/api/templates/filter.html',
        link: function (scope, element, attrs) {
            scope.user_id = scope.$parent.user_id;

            scope.updateParams = scope.$parent.updateParams;
            var settings = {patch: {method: 'PATCH'}, delete: {method: 'DELETE'}};
            var resource = $resource('/api/' + scope.type + '/:id/', {id: '@id'}, settings);

            if (!scope.user_id) {
                scope.editFilter = function (item) {
                    if(scope.type != 'authors') {
                        item.edit = true;
                    }
                };
                scope.finishEditFilter = function (item) {
                    if (item.name) {
                        item.edit = false;
                        resource.patch(item);
                    }
                    else {
                        item.deleted = true;
                        resource.delete(item);
                    }
                };
                scope.deleteFilter = function (item) {
                    item.deleted = true;
                    resource.delete(item);
                };
                scope.handleEnterKey = function (keyEvent, item) {
                    if (keyEvent.which == 13) {
                        // scope.finishEditFilter(item);
                        keyEvent.target.blur();
                    }
                };
            }
        }
    };
});

quotesApp.directive('syncFocusWith', function ($timeout, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            focusValue: '=syncFocusWith',
            ngShow: '='
        },
        link: function (scope, $element, attrs) {
            scope.$watch('focusValue', function (currentValue, previousValue) {
                setTimeout(function () {
                    $element[0].focus();
                }, 1);
            });
        }
    };
});
