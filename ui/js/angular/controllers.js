var ALL_ITEMS_ID = 0;

quotesApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

quotesApp.controller('filterController', function ($scope, $window, $route, $routeParams, $location, $resource, $timeout, filtersMapping) {
    var filterResource;
    $scope.filterParams = {};

    if (!$location.$$path) {
        $location.path('/authors/false/categories/false/tags/false/search/false/page/1');
    }

    $scope.desktopView = true;
    if ($window.innerWidth < 992) {
        $scope.desktopView = false;
    }

    $(window).resize(function () {
        var desktopView = true;
        if (window.innerWidth < 992) {
            desktopView = false;
        }
        $scope.$apply(function () {
            $scope.desktopView = desktopView;
        });
    });

    $scope.init = function (userId, loggedUserID) {
        if ($scope.user_id === undefined) {
            $scope.user_id = userId || 0;
        }

        if ($scope.loggedUserId === undefined) {
            $scope.loggedUserId = loggedUserID || 0;
        }

        if ($scope.readOnly === undefined) {
            $scope.readOnly = (userId !== loggedUserID);
        }

        var params = {};
        if ($scope.user_id !== $scope.loggedUserId) {
            params['user_id'] = $scope.user_id;
        }

        makeRequest('/api/categories/', 'categories', params);
        makeRequest('/api/authors/', 'authors', params);
        makeRequest('/api/tags/', 'tags', params);

        var optionsResource = $resource('/api/filters/', {}, {options: {method: 'OPTIONS'}});
        optionsResource.options(function (data) {
            $scope.options = data.results;
        });
    };

    $scope.$on('$routeChangeStart', function (next, current) {
        for (var key in current.params) {
            var data = current.params[key].split(',');

            if (data.indexOf('false') >= 0) {
                delete $scope.filterParams[filtersMapping[key]];
                continue;
            }
            $scope.filterParams[filtersMapping[key]] = data;
        }

        if (($scope.user_id !== $scope.loggedUserId) || $scope.user_id == ALL_ITEMS_ID) {
            $scope.filterParams['user_id'] = $scope.user_id;
        }

        $timeout(function () {
            if ($scope.grid) {
                $scope.refreshGrid();
            }
        }, 500);

        makeRequest('/api/quotes/', 'quotes', $scope.filterParams, true);
        $window.scrollTo(0, 0);
    });

    $scope.updateParams = function (type, id) {
        var filterType = filtersMapping[type];
        var isDefined = typeof $scope.filterParams[filterType] != 'undefined';

        if (isDefined && $scope.filterParams[filterType].indexOf(id.toString()) >= 0) {
            var index = $scope.filterParams[filterType].indexOf(id.toString());
            $scope.filterParams[filterType].splice(index, 1);
        }
        else {
            if ($scope.filterParams[filterType] instanceof Array) {
                $scope.filterParams[filterType].push(id.toString());
            }
            else {
                $scope.filterParams[filterType] = [id.toString()];
            }
        }

        var filters = {
            authors: $routeParams.authors || false,
            categories: $routeParams.categories || false,
            tags: $routeParams.tags || false,
            search: $routeParams.search || false,
        };

        filters[type] = $scope.filterParams[filterType].join(',') || false;

        var path = '/authors/' + filters.authors + '/categories/' + filters.categories +
            '/tags/' + filters.tags + '/search/' + filters.search + '/' + 'page/1';

        $scope.updateFilters(type);
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
        delete $scope.filterData;

        $('#addFilterModal').modal();
    };

    $scope.createFilter = function () {
        var createResource = $resource('/api/' + $scope.filterType + '/');

        createResource.save($scope.filterData, function () {
            $('#addFilterModal').modal('hide');
            $scope.init();
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
        id = typeof id !== 'undefined' ? id : null;

        if (id) {
            var getResource = $resource('/api/quotes/:quoteId/', {quoteId: id});

            getResource.get(function (data) {
                $scope.quoteData = data;
                $scope.quoteData.tags = data.tags_name;
                $scope.quoteData.author = data.author_name ? data.author_name.toString() : null;
                $scope.quoteData.category = data.category_name ? data.category_name.toString() : null;

                $timeout(function () {
                    CKEDITOR.instances['id_text'].setData(data.text);
                    $('#id_author').val($scope.quoteData.author);
                    $('#id_author').trigger('change');
                    $('#id_category').val($scope.quoteData.category);
                    $('#id_category').trigger('change');

                    $('#id_tags').trigger('change');
                    $('#editQuoteModal').modal();
                });
            });
        }
        else {
            $timeout(function () {
                delete $scope.quoteData;
                CKEDITOR.instances['id_text'].setData('');
                $('#id_author').val('');
                $('#id_author').trigger('change');
                $('#id_category').val('');
                $('#id_category').trigger('change');
                $('#id_tags').val([]);
                $('#id_tags').trigger('change');
            });
            $('#editQuoteModal').modal();
        }
    };

    $scope.editQuote = function (item) {
        var settings = {patch: {method: 'PATCH'}};
        var quoteResource = $resource('/api/quotes/:id/', {id: '@id'}, settings);
        var data = {
            title: $scope.quoteData.title,
            private: $scope.quoteData.private,
            author_name: $scope.quoteData.author,
            category_name: $scope.quoteData.category,
            source: $scope.quoteData.source,
            reference: $scope.quoteData.reference,
            tags_name: $scope.quoteData.tags,
            text: CKEDITOR.instances['id_text'].getData()
        };

        if ($scope.quoteData.id) {
            data.id = $scope.quoteData.id;
            quoteResource.patch(data, onSuccess, onError);
        }
        else {
            quoteResource.save(data, onSuccess, onError);
        }

        function onSuccess(data) {
            $route.reload();
            $scope.init($scope.user_id);
            $('#editQuoteModal').modal('hide');

            $timeout(function () {
                delete $scope.quoteData;
                CKEDITOR.instances['id_text'].setData('');
                $('#id_author').val('');
                $('#id_author').trigger('change');
                $('#id_category').val('');
                $('#id_category').trigger('change');
                $('#id_tags').val([]);
                $('#id_tags').trigger('change');
            });
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
                $scope.updateFilters(field);
            });
        }
    }

    $scope.updateFilters = function (field) {
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
    };
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
            search: $scope.search || false
        };

        var path = '/authors/' + filters.authors + '/categories/' + filters.categories +
            '/tags/' + filters.tags + '/search/' + filters.search + '/page/1';
        $location.path(path);
    };

    $scope.handleEnterKey = function (keyEvent) {
        if (keyEvent.which == 13) {
            $scope.performSearch();
        }
    };
});
