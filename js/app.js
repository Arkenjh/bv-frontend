var materialAdmin = angular.module('materialAdmin', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable', 
    'ngCookies'
])
.constant('API_SERVER', 'http://127.0.0.1:8000/api/')
.constant('API', 'http://127.0.0.1:8000')
