var quotesApp = angular.module("quotesApp", ['ngResource', 'cgBusy', 'ngRoute']);

quotesApp.config(function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
