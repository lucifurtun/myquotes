var quotesApp = angular.module("quotesApp", ['ngResource', 'cgBusy']);

quotesApp.config(function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
