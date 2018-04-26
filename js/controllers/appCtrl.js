

    angular.module('app').controller('AppCtrl', function($scope, $http, $location, $timeout, $interval, $filter, $uibModal, SeverPaginate, AppService, CharacterFactory) {

        var vm = this, interval = null;

        vm.paginateParams = {
            next: null,
            previous: null,
            count: 0,
        };
        vm.items = [];
        vm.loading = false;
        vm.timeRemaining = 120; // seconds

        vm.load = load;
        vm.prev = prev;
        vm.next = next;
        vm.validate = validate;
        //vm.$onInit = init;

        vm.total = 0;
        AppService.setScore(0);

        $scope.$on('$destroy', __stopTimer);

        init();

        function init(){
            
            load('https://swapi.co/api/people/?format=json');
            timer();

        }

        function timer(){

            interval = $interval(function(){
                
                vm.timeRemaining--;
                if(vm.timeRemaining == 0){
                    __stopTimer();
                    AppService.setScore(vm.total)
                    $location.url('finish');
                }

            }, 1000);

        }

        function load(url){
            vm.loading = true;
            AppService.loadCharacters(url)
                .then(function(response){

                    var data = response.data;
                    vm.paginateParams = {
                        next: data.next,
                        previous: data.previous,
                        count: data.count,
                    };

                    vm.items = data.results;

                    vm.loading = false;

                });
        }

        function prev(){
            load(vm.paginateParams.previous);
        }

        function next(){
            load(vm.paginateParams.next);
        }

        function validate(character, index){

            if(character.value && character.value.length){

                // faço o validar
                var detailsHistory = AppService.getCharacterDetailsHistory();

                if(detailsHistory[character.url] == 'answered'){
                    alert('Você já respondeu essse personagem');
                    return;
                }

                AppService.answeredCharacter(character.url);
                
                if(character.name.toString().toLowerCase() == character.value.toLowerCase()){

                    if(detailsHistory[character.url]){

                        vm.total = vm.total + 5;

                        //console.log('existe de 5 pontos',vm.total);
                    } else {

                        vm.total = vm.total + 10;

                        //console.log('não existe de 10 pontos',vm.total);
                    }
                }

            } else {

                __modalOpen(character)        
            }

        }

        function __stopTimer(){

            $interval.cancel(interval);

        }

        function __modalOpen(character) {

            var modalInstance = $uibModal.open({
                templateUrl: 'templates/modal.html',
                controller: 'ModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    character: function () {
                      return character;
                    }
                }    
            });

            return modalInstance.result;
        }

    });
   