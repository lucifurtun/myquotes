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
            scope.readOnly = scope.$parent.readOnly;

            scope.updateParams = scope.$parent.updateParams;
            var settings = {patch: {method: 'PATCH'}, delete: {method: 'DELETE'}};
            var resource = $resource('/api/' + scope.type + '/:id/', {id: '@id'}, settings);

            if (!scope.readOnly) {
                scope.editFilter = function (item) {
                    if (scope.type != 'authors') {
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

quotesApp.directive('masonryGrid', function ($timeout, $window, $document, $resource) {
    return {
        restrict: 'A',

        link: function (scope, $element, attrs) {
            scope.$parent.grid = $('.grid').masonry({
                itemSelector: '.grid-item',
                columnWidth: 275
            });

            var docHeight = $($document).height();
            var windowHeight = $($window).height();

            var nextPage = 2;
            var blockRequest = false;

            scope.refreshGrid = function () {
                scope.$parent.grid.masonry('reloadItems').masonry('layout');
                nextPage = 2;
            };

            $timeout(function () {
                updateDimensions();

                angular.element(document).bind('scroll', function () {
                    if (!nextPage || blockRequest) {
                        return false;
                    }

                    if ($window.pageYOffset >= (docHeight - windowHeight) - 400) {
                        blockRequest = true;
                        var quotesResource = $resource('/api/quotes/');
                        var params = scope.filterParams;
                        params.page = nextPage;
                        quotesResource.get(params, function (data) {
                            nextPage = data.pages.next;
                            scope.quotes = scope.quotes.concat(data.results);

                            $timeout(function () {
                                scope.$apply();
                                updateDimensions();
                            });
                        });
                    }
                });
            }, 500);


            function updateDimensions() {
                $timeout(function () {
                    docHeight = $($document).height();
                    windowHeight = $($window).height();
                    blockRequest = false;
                }, 500);
            }
        }
    };
});


quotesApp.directive('masonryItem', ['$timeout', function ($timeout) {
    return {
        restrict: 'AEC',
        link: function (scope, $element, attrs) {
            $timeout(function () {
                scope.$parent.grid.append($element).masonry('appended', $element);
            });
        }
    };
}]);
