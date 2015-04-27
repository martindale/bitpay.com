(function(window) {
  'use strict';

  if (window.bootstrapRatesApp) {
    return;
  }

  function bootstrapRatesApp() {
    var ratesApp = document.getElementById('ratesAppContainer');
    if (typeof angular !== 'undefined' && ratesApp) {
      angular.bootstrap(ratesApp, ['ratesApp']);
    }
  }

  angular.module('ratesApp', ['ratesApp.view']);

  angular.module('ratesApp.view', [
      'ratesApp.price',
    ])
    .controller('viewController', ['$scope', function($scope) {}]);

  angular.module('ratesApp.price', [
    'ratesApp.price.ratesService',
    'ratesApp.price.priceDirective'
  ]);

  angular.module('ratesApp.price.ratesService', [])
    .factory('ratesService', ['$http', '$interval', function($http, $interval) {
      var ratesAPI = 'https://bitpay.com/rates';
      var interval = 5 * 1000;
      var currentRatePerBTC = {
        'BTC': 1,
        'XBT': 1000000
      };
      $interval(updateRates, interval);
      updateRates();

      function updateRates() {
        $http.get(ratesAPI)
          .success(function(data, status, headers, config) {
            var ratesObjects = data.data;
            for (var i = 0; i < ratesObjects.length; i++) {
              currentRatePerBTC[ratesObjects[i].code] = ratesObjects[i].rate;
            }
          }).
        error(function(data, status, headers, config) {
          console.error('Error fetching rates from: ' + ratesAPI + '. Status: ' + status);
        });
      }

      function getRate(baseCurrencyCode, quoteCurrencyCode) {
        if (currentRatePerBTC.hasOwnProperty(baseCurrencyCode) && currentRatePerBTC.hasOwnProperty(quoteCurrencyCode)) {
          return currentRatePerBTC[quoteCurrencyCode] / currentRatePerBTC[baseCurrencyCode];
        }
      }
      return {
        getRate: getRate
      };
    }]);

  angular.module('ratesApp.price.priceDirective', [
      'ratesApp.price.ratesService',
    ])
    .directive('price', ['ratesService', 'currencyFilter', function(ratesService, currencyFilter) {
      var nonbreakingSpace = '\u00A0';
      return {
        restrict: 'E',
        scope: {
          currency: '@',
          valuedIn: '@'
        },
        template: '{{price()}}',
        link: function(scope, element, attrs) {

          scope.price = function() {
            var rate = ratesService.getRate(scope.currency, scope.valuedIn);
            if (!rate) {
              return nonbreakingSpace;
            }
            if (scope.valuedIn === 'BTC') {
              return currencyFilter(rate, '฿', 6) + ' BTC';
            }
            return currencyFilter(rate, scope.valuedIn, 4);
          };
        }
      };
    }]);

  bootstrapRatesApp();
  window.bootstrapRatesApp = bootstrapRatesApp;
}(window));
