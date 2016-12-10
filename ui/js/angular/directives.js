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
