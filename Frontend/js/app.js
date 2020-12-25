var app = angular.module('beagleapp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/systemstatus',
        {
            controller: 'SystemStatusController',
            templateUrl: 'web/SystemStatus.html',
        })
        .when('/about',
        {
            controller: 'MainViewController',
            templateUrl: 'web/About.html',
        })
        .otherwise({ redirectTo: '/' });
});