app.factory('movieService', ['$http', '$q', function ($http, $q) {

    var serviveFactory = {
        getMyMovie: getMyMovie,
        getMyStar:getMyStar
    }

    return serviveFactory;

    function getMyMovie(movie) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'http://www.omdbapi.com/?t=' + movie + '&apikey=92eec4d1',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (responce) {
            deferred.resolve(responce.data);

        }, function (errResponse) {
            deferred.reject(errResponse);
        });

        return deferred.promise;
    }


    function getMyStar(star) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'http://api.tvmaze.com/search/people?q='+star,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(function (responce) {
            deferred.resolve(responce);

        }, function (errResponce) {
            deferred.reject(errResponce)
        });

        return deferred.promise;
    }


}]);