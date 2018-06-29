app.controller('MyStarsController', ['$scope', 'movieService', '$ionicModal', 'ionicToast', '$http', 'localStorageService', '$ionicLoading', function ($scope, movieService, $ionicModal, ionicToast, $http, localStorageService, $ionicLoading) {

    console.log('Loaded Star Controller');

    var myStars = 'myStars';

    var starList = ['Tom Hanks', 'Tom Hardy', 'Al Pacino', 'Hugh Jackman'];

    $scope.stars = [];

    $scope.newStar = {};

    $scope.starSearch = { name: "" }

    $scope.newStar.isExist = false;

    $ionicModal.fromTemplateUrl('view/modals/new-star-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.newStarModal = modal;
    });


    var getAllStars = function () {
        startLoading();
        if (localStorageService.get(myStars)) {
            $scope.stars = localStorageService.get(myStars);
            stopLoading();

        } else {

            for (var i = 0; i < starList.length; i++) {
                movieService.getMyStar(starList[i]).then(function (data) {
                    $scope.stars.push(data.data[0].person)
                    stopLoading();

                }, function (error) {
                    console.log('error while retreiving star')

                });
            }

        }


    }

    $scope.searchStars = function () {

        movieService.getMyStar($scope.newStar.searchName).then(function (data) {

            $scope.newStars = data.data;

        }, function (error) {
            console.log('error while retreiving star')

        });

    }

    $scope.selectNewStarToList = function (selectedNewStar) {
        $scope.newStar.searchName = selectedNewStar.person.name;
        $scope.newStar = selectedNewStar.person;
        $scope.newStar.isExist = true;
        $scope.newStars = [];

    }

    $scope.addNewStarToList = function () {
        if ($scope.newStar.isExist) {
            $scope.stars.push($scope.newStar);
            localStorageService.set(myStars, $scope.stars);
            ionicToast.show('Added ' + $scope.newStar.name + ' to your star list', 'top', false, 2500);

        } else {
            ionicToast.show('Please select your favourite star', 'bottom', false, 2500);
        }


    }

    $scope.openNewStarModal = function () {

        $scope.newStarModal.show();
    }

    $scope.closeNewStarModal = function () {
        $scope.newStar = {};
        $scope.newStar.isExist = false;
        $scope.newStarModal.hide();
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
        $scope.starSearch.name = "";
    }

    var init = function () {

        getAllStars();
    }

    init();


}]);