var quotesApp = angular.module("quotesApp", ['ngResource', 'cgBusy', 'ngRoute']);

quotesApp.config(function ($resourceProvider, $httpProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});
