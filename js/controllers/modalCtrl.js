

    angular.module('app').controller('ModalCtrl', function($scope, $http, CharacterFactory, AppService, character) {

        var vm = this, characterInstance = new CharacterFactory(character);

        vm.loadingVehicles = true;
        vm.loadingFilms = true;
        vm.character = angular.copy(character);
        
        vm.$onInit = init;

        function init() {

            vm.character.vehicles = [];
            vm.character.films = [];
            
            __characterDeatilsViewd();
            __loadVehicles();
            __loadFilms();

        }

        function __characterDeatilsViewd() {

            AppService.setCharacterDetailsHistory(character.url);

        }

        function __loadVehicles() {

            console.log('veiculos');

            vm.loadingVehicles = true;
            characterInstance.getVehicles()
            .then(function(vehicles){

                vm.loadingVehicles = false;
                vm.character.vehicles = vehicles;


                console.log('veículos do cara', vehicles);

            });
        }

        function __loadFilms() {

            vm.loadingFilms = true;
            characterInstance.getFilms()
            .then(function(films){

                vm.loadingFilms = false;
                vm.character.films = films;
                console.log('filmes do cara', films);

            });
        }


    })
