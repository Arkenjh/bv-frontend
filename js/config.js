materialAdmin
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise("/home");


        $stateProvider
        
            //------------------------------
            // HOME
            //------------------------------

            .state ('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                insertBefore: '#app-level-js',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                                ]
                            }
                        ])
                    }                    
                }
            })


            .state ('login', {
                url: '/login',
                templateUrl: 'views2/login.html'
            })

            .state ('jwt', {
                url: '/jwt',
                templateUrl: 'views2/jwt.html'
            })
            
            //------------------------------
            // PAGES
            //------------------------------
            
            .state ('pages', {
                url: '/pages',
                templateUrl: 'views/common.html'
            })
            
            .state ('pages.profile', {
                url: '/profile',
                templateUrl: 'views2/profile.html'
            })        
            //-------------------------------
        
            .state ('pages.pricing-table', {
                url: '/pricing-table',
                templateUrl: 'views/pricing-table.html'
            })

            .state ('news', {
                url: '/news',
                templateUrl: 'views2/common.html'
            })  

            .state ('reports', {
                url: '/reports',
                templateUrl: 'views2/common.html'
            })
        
            .state ('reports.list', {
                url: '/list',
                templateUrl: 'views2/reports/list.html'
            })        

            .state ('reports.add', {
                url: '/add',
                templateUrl: 'views2/reports/add.html', 
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/nouislider/jquery.nouislider.css',
                                    'vendors/farbtastic/farbtastic.css',
                                    'vendors/bower_components/summernote/dist/summernote.css',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/input-mask/input-mask.min.js',
                                    'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                    'vendors/bower_components/summernote/dist/summernote.min.js',
                                    'vendors/fileinput/fileinput.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                    'vendors/bower_components/angular-farbtastic/angular-farbtastic.js'
                                ]
                            }
                        ])
                    }
                }                
            })  

            .state ('customers', {
                url: '/customers',
                templateUrl: 'views2/common.html'
            })
        
            .state ('customers.list', {
                url: '/list',
                templateUrl: 'views2/customers/list.html'
            })        

            .state ('customers.view', {
                url: '/view/:id',
                templateUrl: 'views2/customers/view.html', 
                controller: 'CustomerViewCtrl'
            }) 

            .state ('customers.add', {
                url: '/add',
                templateUrl: 'views2/customers/add.html', 
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/nouislider/jquery.nouislider.css',
                                    'vendors/farbtastic/farbtastic.css',
                                    'vendors/bower_components/summernote/dist/summernote.css',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/input-mask/input-mask.min.js',
                                    'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                    'vendors/bower_components/summernote/dist/summernote.min.js',
                                    'vendors/fileinput/fileinput.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                    'vendors/bower_components/angular-farbtastic/angular-farbtastic.js'
                                ]
                            }
                        ])
                    }
                }                
            })  


            .state ('news.pricing', {
                url: '/pricing',
                templateUrl: 'views2/pricing.html'
            });

            // use the HTML5 History API
            //$locationProvider.html5Mode(true);
            
    });
