(function () {
    'use strict';

    angular.module('app', ['ngRoute']).config(function($routeProvider) {
        
        $routeProvider
        
        .when("/", {
            templateUrl : "templates/loading.html",
            controller: 'LoadingCtrl'
        })

        .when("/quiz", {
            templateUrl : "templates/quiz.html",
            controller: 'AppCtrl',
            controllerAs: 'vm'
        })

        .when("/finish", {
            templateUrl : "templates/finish.html",
            controller: 'FinishCtrl'
        })
        ;
    });

})(); 