

    angular.module('app').factory('CharacterFactory', function ($q, $http, $timeout) {

        return function (character) {

            var me = this;

            me.getVehicles = getVehicles;
            me.getFilms = getFilms;

            function getVehicles() {

                var deferred = $q.defer(), vehiclesUrls = character.vehicles;

                $timeout(function () {

                    var promises = [];
                    vehiclesUrls.map(function (url) {
                        promises.push($http.get(url));
                    });

                    if (promises.length) {

                        $q.all(promises)
                            .then(function (results) {

                                var vehicles = [];
                                results.map(function (result) {
                                    vehicles.push(result.data);
                                });

                                deferred.resolve(vehicles);

                            });

                    } else {

                        deferred.resolve([]);

                    }

                });

                return deferred.promise;

            }

            function getFilms() {

                var deferred = $q.defer(), filmsUrls = character.films;

                $timeout(function () {

                    var promises = [];
                    filmsUrls.map(function (url) {
                        promises.push($http.get(url));
                    });

                    if (promises.length) {

                        $q.all(promises)
                            .then(function (results) {

                                var films = [];
                                results.map(function (result) {
                                    films.push(result.data);
                                });

                                deferred.resolve(films);

                            });

                    } else {

                        deferred.resolve([]);

                    }

                });

                return deferred.promise;

            }

        }

    })
