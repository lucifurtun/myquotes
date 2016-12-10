quotesApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

quotesApp.controller('filterController', function ($scope, $resource) {
    var url, filterResource, filter_params = {};

    $scope.updateParams = function ($event, type, id) {
        $event.preventDefault();

        var element = angular.element($event.currentTarget);
        if (element.hasClass('active')) {
            element.removeClass('active');
            var index = filter_params[type].indexOf(id);
            filter_params[type].splice(index, 1);
        }
        else {
            element.addClass('active');
            if (filter_params[type] instanceof Array) {
                filter_params[type].push(id);
            }
            else {
                filter_params[type] = [id];
            }
        }

        url = '/api/quotes/';
        makeRequest(url, 'quotes', filter_params, true);
    };

    url = '/api/categories/';
    makeRequest(url, 'categories', {});

    url = '/api/authors/';
    makeRequest(url, 'authors', {});

    url = '/api/tags/';
    makeRequest(url, 'tags', {});

    url = '/api/quotes/';
    makeRequest(url, 'quotes', {}, true);

    function makeRequest(url, field, params, paginated) {
        paginated = paginated || false;

        filterResource = $resource(url);

        if (paginated) {
            $scope.req = filterResource.get(params, function (data) {
                $scope[field] = data.results;
            });
        }
        else {
            $scope.req = filterResource.query(params, function (data) {
                $scope[field] = data;
            });
        }
    }
});

quotesApp.controller('dashboardController', function ($scope, $resource) {
    var url, filterResource;

    url = '/api/authors/';
    makeRequest(url, 'authors', {});

    function makeRequest(url, field, params) {
        filterResource = $resource(url);

        $scope.req = filterResource.query(params, function (data) {
            $scope[field] = data;
        });
    }
});
