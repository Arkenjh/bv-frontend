'use strict';


materialAdmin

  .controller('AuthrequiredCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })


  .controller('LoginCtrl', function ($scope, $location, djangoAuth, Validate) {
    this.login = 1;
    this.register = 0;
    this.forgot = 0;   

    $scope.model = {'username':'','password':''};
    $scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
        // success case
          $location.path("/pages/profile");
        },function(data){
        // error case
          $scope.errors = data;
        });
      }
    }
  })


  .controller('LogoutCtrl', function ($scope, $location, djangoAuth) {
    djangoAuth.logout();
  })


  .controller('MainCtrl', function ($scope, $cookies, $location, djangoAuth) {

    $scope.login = function(){
      djangoAuth.login(prompt('Username'),prompt('password'))
        .then(function(data){
          handleSuccess(data);
        },handleError);
    }

    $scope.logout = function(){
      djangoAuth.logout()
        .then(handleSuccess,handleError);
    }

    $scope.resetPassword = function(){
      djangoAuth.resetPassword(prompt('Email'))
        .then(handleSuccess,handleError);
    }

    $scope.register = function(){
      djangoAuth.register(prompt('Username'),prompt('Password'),prompt('Email'))
        .then(handleSuccess,handleError);
    }

    $scope.verify = function(){
      djangoAuth.verify(prompt("Please enter verification code"))
        .then(handleSuccess,handleError);
    }

    $scope.goVerify = function(){
      $location.path("/verifyEmail/"+prompt("Please enter verification code"));
    }

    $scope.changePassword = function(){
      djangoAuth.changePassword(prompt("Password"), prompt("Repeat Password"))
        .then(handleSuccess,handleError);
    }

    $scope.profile = function(){
      djangoAuth.profile()
        .then(handleSuccess,handleError);
    }

    $scope.updateProfile = function(){
      djangoAuth.updateProfile({'first_name': prompt("First Name"), 'last_name': prompt("Last Name"), 'email': prompt("Email")})
        .then(handleSuccess,handleError);
    }

    $scope.confirmReset = function(){
      djangoAuth.confirmReset(prompt("Code 1"), prompt("Code 2"), prompt("Password"), prompt("Repeat Password"))
        .then(handleSuccess,handleError);
    }

    $scope.goConfirmReset = function(){
      $location.path("/passwordResetConfirm/"+prompt("Code 1")+"/"+prompt("Code 2"))
    }

    var handleSuccess = function(data){
      $scope.response = data;
    }

    var handleError = function(data){
      $scope.response = data;
    }

    $scope.show_login = true;
    $scope.$on("djangoAuth.logged_in", function(data){
    $scope.show_login = false;
    });
    $scope.$on("djangoAuth.logged_out", function(data){
    $scope.show_login = true;
    });

  })


  .controller('MasterCtrl', function ($scope, $location, djangoAuth) {
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(function(){
      $scope.authenticated = true;
    });
    // Wait and respond to the logout event.
    $scope.$on('djangoAuth.logged_out', function() {
      $scope.authenticated = false;
    });
    // Wait and respond to the log in event.
    $scope.$on('djangoAuth.logged_in', function() {
      $scope.authenticated = true;
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection)
      $location.path('/restricted').replace();
    });
  })

  .controller('UserprofileCtrl', function ($scope, djangoAuth, Validate) {
    $scope.model = {'first_name':'','last_name':'','email':''};
    $scope.complete = false;
    djangoAuth.profile().then(function(data){
      $scope.model = data;
    });
    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.updateProfile(model)
      .then(function(data){
        // success case
        $scope.complete = true;
      },function(data){
        // error case
        $scope.error = data;
        });
      }
    }
  })