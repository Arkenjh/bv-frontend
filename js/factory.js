materialAdmin

    // =========================================================================
    // Factory
    // =========================================================================

    .factory('Workers', function($resource, API) {
        return $resource(API+'/workers/myworkers/:id');
    })

    .factory('Stores', function($resource, API) {
        return $resource(API+'/stores/stores/:id');
    })
    
    .factory('Reports', function($resource, API) {
        return $resource(API+'/reports/reports/:id');
    })

    .factory('Customers', function($resource, API) {
        return $resource(API+'/customers/customers/:id');
    })
    
    .factory('authInterceptor', function(API, authService, $location) {
		return {
			// automatically attach Authorization header
			request: function(config) {
				console.log('authInterceptor | request');


				if(authService.isAuthed()) {

					var token = authService.getToken();
					authService.refresh(token);

					if(config.url.indexOf(API) === 0 && token) {
						config.headers.Authorization = 'JWT ' + token;
					}
				} else {
					console.log('not loged | redirect to login page');
					$location.path("/login");
				}
					return config;
			},
			// If a token was sent back, save it
			response: function(res) {
				if(res.config.url.indexOf(API) === 0 && res.data.token) {
					authService.saveToken(res.data.token);
				}
				return res;
			},
			responseError: function(res) {
				if (res.status === 403) {
					console.log('ERROR 403 | redirect to login page');
					$location.path("/login");
					return res;
				}
				return res;
			},
		}
	})

	.config(function($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	})	