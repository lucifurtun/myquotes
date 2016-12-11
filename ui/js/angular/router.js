quotesApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/author/:author/category/:category/tags/:tags/', {
            controller: 'filterController',
        });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });

});
