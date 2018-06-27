app.config(function ($stateProvider, $urlRouterProvider,localStorageServiceProvider) {

    localStorageServiceProvider
      .setPrefix('movie-app');

    $urlRouterProvider.otherwise('tab/movies');

    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'view/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('tab.movies', {
            url: '/movies',
            views: {
                'tab-myMovies': {
                    templateUrl: 'view/movies.html',
                    controller: 'MyMovieController'
                }
            }
        })

        .state('tab.stars', {
            url: '/stars',
            views: {
                'tab-myStars': {
                    templateUrl: 'view/stars.html',
                    controller: 'MyStarsController'
                }
            }
        })
        .state('tab.shows', {
            url: '/shows',
            views: {
                'tab-myShows': {
                    templateUrl: 'view/shows.html',
                    controller: 'MyShowsController'
                }
            }
        })


});

