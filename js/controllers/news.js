materialAdmin

    .controller('TestController', ['$scope', 'ngTableParams', 'Stores', 'Reports', function($scope, ngTableParams, Stores, Reports) {
        $scope.id = 1

        //$scope.store = Reports.get({ id: $scope.id }, function() {}); // get() returns a single store

        //$scope.stores = Reports.query(function() {}); //query() returns all the stores

        $scope.postData = {};
        $scope.newReport = function() {
            var report = new Reports($scope.postData);
            report.save();
        }

        var data = Reports.query();
        
        //Basic Example
        $scope.tableBasic = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                console.log('getData')
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })

        $scope.data = data     

    }])


    .controller('JwtCtrl',function($scope, $location, userService, authService, Stores, Validate) {

        var self = this;
        this.login = 1;
        this.register = 0;
        this.forgot = 0;

        $scope.model = {'username':'','password':''};          

        function handleRequest(res) {
            var token = res.data ? res.data.token : null;
            if(token) { console.log('JWT:', token); }
            self.message = res.data;
        }

        self.log_in = function(formData) {
            $scope.errors = [];
            Validate.form_validation(formData,$scope.errors);
            if(!formData.$invalid){            
            userService.login($scope.model.username, $scope.model.password)
                .then(function(data){
                // success case
                  $location.path("/pages/profile");
                },function(data){
                // error case
                  $scope.errors = data;
                });
            }
        }
        self.register = function() {
            userService.register(self.username, self.password)
                .then(handleRequest, handleRequest)
        }
        self.getQuote = function() {
            //userService.getQuote().then(handleRequest, handleRequest)
            self.message = stores.query();
        }
        self.logout = function() {
            authService.logout && authService.logout()
        }
        self.isAuthed = function() {
            var result = authService.isAuthed ? authService.isAuthed() : false
            console.log(result)
            return result
        }
    })    