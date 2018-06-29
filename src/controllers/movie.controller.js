
app.controller('MyMovieController', ['$scope', 'movieService', '$ionicModal', 'ionicToast', 'localStorageService', '$ionicLoading', function ($scope, movieService, $ionicModal, ionicToast, localStorageService, $ionicLoading) {

    var myMovies = 'myMovies';
    var movieList = ['The Shawshank Redemption', 'Forrest Gump', 'The Green Mile'];
    $scope.movies = [];
    $scope.newMovie = {};
    $scope.movieSearch = { name: "" };
    $scope.newMovie.isExist = false;

    $ionicModal.fromTemplateUrl('view/modals/new-movie-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.newMovieModal = modal;
    });


    var getAllMovies = function () {
        startLoading();
        if (localStorageService.get(myMovies)) {
            $scope.movies = localStorageService.get(myMovies);
            stopLoading();

        } else {

            for (var i = 0; i < movieList.length; i++) {

                movieService.getMyMovie(movieList[i]).then(function (data) {

                    $scope.movies.push(data)
                    stopLoading();

                }, function (error) {

                    console.log("error while retreiving movie")
                });

            }
        }


        console.log($scope.movies);

    }

    $scope.searchNewMovieToAdd = function (movie) {
        startLoading();
        movieService.getMyMovie(movie).then(function (data) {
            if (data.Title) {
                stopLoading();
                $scope.newMovie = data;
                $scope.newMovie.isExist = true;
            } else {
                stopLoading();
                ionicToast.show('Title doesnt match', 'bottom', false, 2500);
                return;

            }
        }, function (error) {
            stopLoading();
            ionicToast.show('Title doesnt match', 'bottom', false, 2500);

        });

    }

    $scope.movieWatched = function () {
        localStorageService.set(myMovies, $scope.movies);
    }

    $scope.addNewMovieToList = function (movie) {

        if ($scope.newMovie.isExist) {
            if (isContainsMovie(movie)) {
                ionicToast.show('This movie already exist', 'bottom', false, 2500);
            } else {
                $scope.movies.push(movie);
                localStorageService.set(myMovies, $scope.movies);
                ionicToast.show('Movie ' + movie.Title + ' added to our List', 'top', false, 2500);
            }

        } else {
            ionicToast.show('Please select a movie', 'bottom', false, 2500);
        }

    }

    var isContainsMovie = function (movie) {
        for (var i = 0; i < $scope.movies.length; i++) {
            if (movie.Title == $scope.movies[i].Title) {
                return true;
            }
        }
        return false;
    }

    $scope.openNewMovieModal = function () {
        $scope.newMovieModal.show();
    }

    $scope.closeNewMovieModal = function () {
        $scope.newMovie = {};
        $scope.newMovie.isExist = false;
        $scope.newMovieModal.hide();
    }


    var startLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'
        });
    }

    var stopLoading = function () {
        $ionicLoading.hide();
    }

    $scope.clear = function () {
        $scope.movieSearch.name = "";
    }

    var init = function () {
        getAllMovies();
    }


    init();

}]);