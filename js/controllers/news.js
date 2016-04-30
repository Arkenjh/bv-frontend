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
                    console.log('redirection to /home')
                  $location.path("../home");
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

    .controller('ReportCtrl', function($scope, Reports, Workers) {
        var self = this;
        console.log('ReportCtrl');

/*
        $scope.workers = Workers.query(function() {});
        $scope.workers.$promise.then(function(data) {
            console.log(data);
        });
*/
        $scope.workers = [];
        
        Workers.query().$promise.then(function(data) {
            $scope.workers = data;
        });

        $scope.model = {'qty_inkjet_1':'','qty_inkjet_2':'','qty_laser_1':'','qty_laser_2':'','date':'','comment':'','workers_list':[]};  

        $scope.add = function(formData) {
            console.log('ReportCtrl | add');
            //console.log($scope.model);
            report = new Reports($scope.model);
            //report.save($scope.model);
            console.log(report);
            Reports.save(report);
        }
    })  

    .controller('CustomersCtrl', ['$filter', '$scope', 'ngTableParams', 'Customers', function($filter, $scope, ngTableParams, Customers) {

        $scope.model = {'firstname':'','lastname':'','phone_1':'','phone_2':'',
        'professional':false,'corporate_name':'','email':'','address':'','zipcode':'','town':'','country':''};  

        $scope.add = function(formData) {
            customer = new Customers($scope.model);
            console.log(customer);
            Customers.save(customer);
        }

        var data = Customers.query();
        /*
        //Basic Example
        $scope.tableBasic = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
                fullname: 'asc'     // initial sorting
            }            
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                
                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                //$defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                console.log(orderedData);
            }
        })

        $scope.data = data     
        */


        // Get data from factory
        //var data = dataFactory.query();

        //Use promise to load data to table, note the replacing of the second tableParams 
        //object parameter with a function
        data.$promise.then(function (data){
            $scope.tableBasic = new ngTableParams({
                page: 1,            // show first page
                count: 10,
                sorting: {
                    fullname: 'asc'
                },
                filter: {
                    name: undefined             
                }
            }, resetTableParams()
            );
        });

        //The function that replaces the tableParams param
        var resetTableParams = function(){
            return {
                total: data.length,
                getData: function($defer, params) {
                    var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
                    var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : filteredData; 

                    params.total(orderedData.length);
                    $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count()));           
                    }
            }
        }






    }])

    .controller('CustomerViewCtrl', function($scope, $state, $stateParams, Customers) {
        
        var id = $stateParams.id;
        console.log(id);

        $scope.customer = Customers.get({ id: id }, function() {});

        $scope.state = $state.current
        $scope.params = $stateParams; 

        $scope.tabs = [
            {
                title:'Echanges',
                content:'In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nam eget dui. In ac felis quis tortor malesuada pretium. Phasellus consectetuer vestibulum elit. Duis lobortis massa imperdiet quam. Pellentesque commodo eros a enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Phasellus a est. Pellentesque commodo eros a enim. Cras ultricies mi eu turpis hendrerit fringilla. Donec mollis hendrerit risus. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Praesent egestas neque eu enim. In hac habitasse platea dictumst.'
            },
            {
                title:'Incidents',
                content:'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nulla sit amet est. Praesent ac massa at ligula laoreet iaculis. Vivamus aliquet elit ac nisl. Nulla porta dolor. Cras dapibus. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.',
            },
            {
                title:'Achats',
                content:'Etiam rhoncus. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Cras id dui. Curabitur turpis. Etiam ut purus mattis mauris sodales aliquam. Aenean viverra rhoncus pede. Nulla sit amet est. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Praesent ac sem eget est egestas volutpat. Cras varius. Morbi mollis tellus ac sapien. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Fusce vel dui.Morbi mattis ullamcorper velit. Etiam rhoncus. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Cras id dui. Curabitur turpis. Etiam ut purus mattis mauris sodales aliquam. Aenean viverra rhoncus pede. Nulla sit amet est. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Praesent ac sem eget est egestas volutpat. Cras varius. Morbi mollis tellus ac sapien. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Fusce vel dui.',
            },
            {
                title:'Garanties',
                content:'Praesent turpis. Phasellus magna. Fusce vulputate eleifend sapien. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.',
            }
        ];

    })