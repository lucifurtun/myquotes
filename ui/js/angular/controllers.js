quotesApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

quotesApp.controller('filterController', function ($rootScope, $scope, $route, $routeParams, $location, $resource) {
    var filterResource, params = {};

    $rootScope.$on('$routeChangeStart', function (next, current) {
        var filter_params = {};

        for (var key in current.params) {
            var data = current.params[key].split(',');
            if (data.length == 1) {
                if (JSON.parse(data)) {
                    filter_params[key] = current.params[key].split(',');
                }
            }
            else {
                filter_params[key] = current.params[key].split(',');
            }
        }

        makeRequest('/api/quotes/', 'quotes', filter_params, true);
    });

    $scope.updateParams = function ($event, type, id) {
        $event.preventDefault();

        var element = angular.element($event.currentTarget);
        if (element.hasClass('active')) {
            element.removeClass('active');
            var index = params[type].indexOf(id);
            params[type].splice(index, 1);
        }
        else {
            element.addClass('active');
            if (params[type] instanceof Array) {
                params[type].push(id);
            }
            else {
                params[type] = [id];
            }
        }

        var filters = {
            author: $routeParams.author || false,
            category: $routeParams.category || false,
            tags: $routeParams.tags || false,
        };

        filters[type] = params[type].join(',') || false;

        var path = '/author/' + filters.author + '/category/' + filters.category + '/tags/' + filters.tags + '/';

        $location.path(path);
    };

    $scope.setDeleteItem = function (id, title) {
        $scope.deleteItem = {
            'id': id,
            'title': title
        };
        $('#myModal').modal();
    };

    $scope.delete = function (id) {
        var deleteResource = $resource('/api/quotes/:quoteId/', {quoteId: id});
        deleteResource.delete();
    };

    makeRequest('/api/categories/', 'categories', {});
    makeRequest('/api/authors/', 'authors', {});
    makeRequest('/api/tags/', 'tags', {});
    // makeRequest('/api/quotes/', 'quotes', {}, true);

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
