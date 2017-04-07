
angular.module('account.route', ['account.controller'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'areas/account/account.html',
            controller: 'AccountCtrl'
          }
        }
      })

  });
