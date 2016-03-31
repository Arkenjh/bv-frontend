materialAdmin
    .config(function ($stateProvider, $urlRouterProvider){
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
        
            .state ('news.reports', {
                url: '/reports',
                templateUrl: 'views2/reports.html'
            })        

            .state ('news.pricing', {
                url: '/pricing',
                templateUrl: 'views2/pricing.html'
            }) 
            
    });
