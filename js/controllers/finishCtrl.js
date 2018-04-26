

    angular.module('app').controller('FinishCtrl', function($scope, $http, AppService) {

        var vm = this

        vm.total = AppService.getScore();

        //console.log(vm.total);
    })

  