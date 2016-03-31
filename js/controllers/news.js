materialAdmin

    .controller('TestController',function($scope, Stores, Reports) {
        $scope.id = 1

        $scope.store = Stores.get({ id: $scope.id }, function() {
            console.log(store);
        }); // get() returns a single store

        $scope.stores = Stores.query(function() {
            console.log(stores);
        }); //query() returns all the stores

        $scope.postData = {};
        $scope.newReport = function() {
            var report = new Reports($scope.postData);
            report.save();
        }

    })


    .controller('JwtCtrl',function($scope, $location, userService, authService, Stores) {

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
                .then(handleRequest, handleRequest)
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