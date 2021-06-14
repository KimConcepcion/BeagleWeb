var app = angular.module('beagleapp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/systemstatus',
        {
            controller: 'SystemStatusController',
            templateUrl: 'web/SystemStatus.html',
        })
        .when('/pru',
        {
            controller: 'PRUController',
            templateUrl: 'web/PRU.html',
        })
        .when('/homesensors',
        {
            controller: 'HomeSensorsController',
            templateUrl: 'web/HomeSensors.html',
        })
        .when('/network',
        {
            controller: 'NetworkController',
            templateUrl: 'web/Network.html',
        })
        .when('/about',
        {
            controller: 'MainController',
            templateUrl: 'web/About.html',
        })
        .otherwise({ redirectTo: '/' });
});
