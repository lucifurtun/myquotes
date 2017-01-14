quotesApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

quotesApp.controller('filterController', function ($scope, $window, $route, $routeParams, $location, $resource, filtersMapping) {
    var filterResource;
    $scope.filterParams = {};

    if (!$location.$$path) {
        $location.path('/authors/false/categories/false/tags/false/search/false/page/1');
    }

    $scope.desktopView = true;
    if ($window.innerWidth < 768) {
        $scope.desktopView = false;
    }

    $(window).resize(function () {
        var desktopView = true;
        if (window.innerWidth < 768) {
            desktopView = false;
        }
        $scope.$apply(function () {
            $scope.desktopView = desktopView;
        });
    });

    $scope.init = function (user_id) {
        $scope.user_id = user_id || 0;

        var params = {};
        if ($scope.user_id) {
            params['user_id'] = $scope.user_id;
        }

        makeRequest('/api/categories/', 'categories', params);
        makeRequest('/api/authors/', 'authors', params);
        makeRequest('/api/tags/', 'tags', params);
        // makeRequest('/api/quotes/', 'quotes', {}, true);
    };

    $scope.$on('$routeChangeStart', function (next, current) {
        for (var key in current.params) {
            var data = current.params[key].split(',');

            if (data.indexOf('false') >= 0) {
                delete $scope.filterParams[filtersMapping[key]];
                continue
            }
            $scope.filterParams[filtersMapping[key]] = data;
        }

        if ($scope.user_id) {
            $scope.filterParams['user_id'] = $scope.user_id;
        }

        makeRequest('/api/quotes/', 'quotes', $scope.filterParams, true);
    });

    $scope.updateParams = function (type, id) {
        var filter_type = filtersMapping[type];
        var is_defined = typeof $scope.filterParams[filter_type] != 'undefined';

        if (is_defined && $scope.filterParams[filter_type].indexOf(id.toString()) >= 0) {
            var index = $scope.filterParams[filter_type].indexOf(id.toString());
            $scope.filterParams[filter_type].splice(index, 1);
        }
        else {
            if ($scope.filterParams[filter_type] instanceof Array) {
                $scope.filterParams[filter_type].push(id.toString());
            }
            else {
                $scope.filterParams[filter_type] = [id.toString()];
            }
        }

        var filters = {
            authors: $routeParams.authors || false,
            categories: $routeParams.categories || false,
            tags: $routeParams.tags || false,
            search: $routeParams.search || false,
        };

        filters[type] = $scope.filterParams[filter_type].join(',') || false;

        var path = '/authors/' + filters.authors + '/categories/' + filters.categories +
            '/tags/' + filters.tags + '/search/' + filters.search + '/' + 'page/1';

        updateFilters(type);
        $location.path(path);
    };

    $scope.updatePage = function (direction) {
        var page = $scope['pages'][direction];

        if (!page) {
            return;
        }

        var filters = {
            authors: $routeParams.authors || false,
            categories: $routeParams.categories || false,
            tags: $routeParams.tags || false,
            search: $routeParams.search || false,
        };

        var path = '/authors/' + filters.authors + '/categories/' + filters.categories +
            '/tags/' + filters.tags + '/search/' + filters.search + '/page/' + page;
        $location.path(path);
    };

    $scope.setFilterType = function (type) {
        $scope.filterType = type;

        $('#addFilterModal').modal();
    };

    $scope.createFilter = function () {
        var createResource = $resource('/api/' + $scope.filterType + '/');

        createResource.save($scope.filterData, function () {
            $('#addFilterModal').modal('hide');
            $scope.init($scope.user_id);
        });
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

    $scope.setEditItem = function (id) {
        // var settings = {options: {method: 'OPTIONS'}};
        // var optionsResource = $resource('/api/filters', {}, settings);
        //
        // optionsResource.options(function (data) {
        //     var options = {};
        //     angular.forEach(data.results, function (options, filter) {
        //         options[filter] = [];
        //         angular.forEach(options, function (value, key) {
        //             options[filter].push({
        //                 id: value.id,
        //                 label: value.name,
        //             });
        //         });
        //     });
        //
        //     $scope.options = options;
        // });
        $scope.editItem = {
            'id': id,
        };

        $('#editQuoteModal').modal();
    };

    $scope.editQuote = function (item) {
        $scope.quoteData.text = CKEDITOR.instances['id_text'].getData();

        var quoteResource = $resource('/api/quotes/');
        quoteResource.save($scope.quoteData, onSuccess, onError);

        function onSuccess(data) {
            $route.reload();
            $('#editQuoteModal').modal('hide');
        }

        function onError(data) {
            $scope.quoteDataErrors = data.data;
        }
    };

    function makeRequest(url, field, params, paginated) {
        paginated = paginated || false;

        filterResource = $resource(url);

        if (paginated) {
            $scope.req = filterResource.get(params, function (data) {
                $scope[field] = data.results;
                $scope['pages'] = data.pages;
            });
        }
        else {
            $scope.req = filterResource.query(params, function (data) {
                $scope[field] = data;
                updateFilters(field);
            });
        }
    }

    function updateFilters(field) {
        for (var key in $scope[field]) {
            if (isNaN(key)) {
                continue;
            }
            var filter = filtersMapping[field];
            var is_defined = typeof $scope.filterParams[filter] != 'undefined';
            if (is_defined && $scope.filterParams[filter].indexOf($scope[field][key].id.toString()) >= 0) {
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

quotesApp.controller('search', function ($scope, $route, $routeParams, $location) {
    $scope.performSearch = function () {
        var filters = {
            authors: $routeParams.authors || false,
            categories: $routeParams.categories || false,
            tags: $routeParams.tags || false,
            search: $scope.search || false,
        };

        console.log(filters);

        var path = '/authors/' + filters.authors + '/categories/' + filters.categories +
            '/tags/' + filters.tags + '/search/' + filters.search + '/page/1';
        console.log(path);
        $location.path(path);
    };

    $scope.handleEnterKey = function (keyEvent) {
        if (keyEvent.which == 13) {
            $scope.performSearch();
        }
    }
});
