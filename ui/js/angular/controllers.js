quotesApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

quotesApp.controller('filterController', function ($scope, $route, $routeParams, $location, $resource) {
    var filterResource;
    $scope.filterParams = {};

    $location.path('/author/false/category/false/tags/false/');

    $scope.$on('$routeChangeStart', function (next, current) {
        for (var key in current.params) {
            var data = current.params[key].split(',');

            if (data.indexOf('false') >= 0) {
                continue
            }
            $scope.filterParams[key] = data;
        }

        makeRequest('/api/quotes/', 'quotes', $scope.filterParams, true);
    });

    $scope.updateParams = function (type, id) {
        var is_defined = typeof $scope.filterParams[type] != 'undefined';

        if (is_defined && $scope.filterParams[type].indexOf(id.toString()) >= 0) {
            var index = $scope.filterParams[type].indexOf(id.toString());
            $scope.filterParams[type].splice(index, 1);
        }
        else {
            if ($scope.filterParams[type] instanceof Array) {
                $scope.filterParams[type].push(id.toString());
            }
            else {
                $scope.filterParams[type] = [id.toString()];
            }
        }

        var filters = {
            author: $routeParams.author || false,
            category: $routeParams.category || false,
            tags: $routeParams.tags || false,
        };

        filters[type] = $scope.filterParams[type].join(',') || false;

        var path = '/author/' + filters.author + '/category/' + filters.category + '/tags/' + filters.tags + '/';
        updateFilters(type);
        $location.path(path);
    };

    $scope.setFilterType = function (type) {
        $scope.filterType = type;

        $('#addFilterModal').modal();
    };

    $scope.createFilter = function () {
        var createResource = $resource('/api/' + $scope.filterType + '/');

        createResource.save($scope.formData, function () {

        });

        $('#addFilterModal').modal('hide');
    };

    $scope.setDeleteItem = function (id, title) {
        $scope.deleteItem = {
            'id': id,
            'title': title
        };

        $('#deleteQuoteModal').modal();
    };

    $scope.deleteQuote = function (id) {
        var deleteResource = $resource('/api/quotes/:quoteId/', {quoteId: id});
        deleteResource.delete(function (data) {
            $route.reload();
        });

        $('#deleteQuoteModal').modal('hide');
    };

    makeRequest('/api/categories/', 'category', {});
    makeRequest('/api/authors/', 'author', {});
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
                updateFilters('author');
                updateFilters('category');
                updateFilters('tags');
            });
        }
    }

    function updateFilters(field) {
        for (var key in $scope[field]) {
            if (isNaN(key)) {
                continue;
            }
            var is_defined = typeof $scope.filterParams[field] != 'undefined';
            if (is_defined && $scope.filterParams[field].indexOf($scope[field][key].id.toString()) >= 0) {
                $scope[field][key].active = true;
            }
            else {
                $scope[field][key].active = false;
            }
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
