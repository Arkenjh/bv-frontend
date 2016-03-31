materialAdmin

    // =========================================================================
    // Factory
    // =========================================================================

    .factory('Stores', function($resource) {
        return $resource('//127.0.0.1:8000/stores/stores/:id');
    })
    
    .factory('Reports', function($resource) {
        return $resource('//127.0.0.1:8000/reports/reports/:id');
    })

    .factory('authInterceptor', function(API, authService) {
		return {
			// automatically attach Authorization header
			request: function(config) {
				var token = authService.getToken();
				if(config.url.indexOf(API) === 0 && token) {
					config.headers.Authorization = 'JWT ' + token;
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
					console.log('XXX 401...');
					return res;
				}
				return res;
			},
		}
	})