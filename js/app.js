var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'Pagination']); 

app.config(function($routeProvider) {
    
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



app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])
    
