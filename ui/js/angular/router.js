quotesApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/authors/:authors/categories/:categories/tags/:tags/search/:search/page/:page', {
            controller: 'filterController',
        });

    // configure html5 to get links working on jsfiddle
    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/

});
