var quotesApp = angular.module("quotesApp", ['ngResource', 'cgBusy', 'ngRoute']);

quotesApp.config(function ($resourceProvider, $httpProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

var filtersMapping = {
    categories: 'category',
    authors: 'author',
    tags: 'tags',
    page: 'page',
    search: 'search',
};

quotesApp.value('filtersMapping', filtersMapping);
