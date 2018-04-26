

    angular.module('app').service('AppService', function ($http) {

        
        var me = this, CHARACTER_DETAILS_KEY = 'CHARACTER_DETAILS_HISTORY', STAR_WARS_SCORE = 'STAR_WARS_SCORE';

        me.vehicles = [];

        me.loadCharacters = loadCharacters;
        me.getCharacterDetailsHistory = getCharacterDetailsHistory;
        me.setCharacterDetailsHistory = setCharacterDetailsHistory;
        me.answeredCharacter = answeredCharacter;
        me.setScore = setScore;
        me.getScore = getScore;

        function loadCharacters(url) {
            return $http.get(url);
        }

        function getCharacterDetailsHistory() {

            var data = localStorage.getItem(CHARACTER_DETAILS_KEY);
            if (data)
                return JSON.parse(data);
            else {

                localStorage.setItem(CHARACTER_DETAILS_KEY, JSON.stringify({}))
                return {};

            }

        }

        function setCharacterDetailsHistory(characterId) {

            var detailsHistory = getCharacterDetailsHistory();
            detailsHistory[characterId] = true;
            localStorage.setItem(CHARACTER_DETAILS_KEY, JSON.stringify(detailsHistory));

        }

        function answeredCharacter(characterId) {

            var detailsHistory = getCharacterDetailsHistory();
            detailsHistory[characterId] = 'answered';
            localStorage.setItem(CHARACTER_DETAILS_KEY, JSON.stringify(detailsHistory));

        }

        function setScore(value) {

            localStorage.setItem(STAR_WARS_SCORE, JSON.stringify(value));
        }

        function getScore() {

            var data = localStorage.getItem(STAR_WARS_SCORE)

            if (data)
                return JSON.parse(data);
        }

    });
