app.controller('indexSymbols', ['$scope', 'indexValues', function($scope, indexValues) {
    indexValues.then(function(data) {
        $scope.symbol_values = data;
        console.log(data);
    }).catch(function(err) {
        console.log('ERROR');
        console.log(err);
    });
}]);

app.controller('registration', ['$scope', '$http', function($scope, $http) {
    $scope.userdata = {};
    $scope.error_message = null;
    $scope.submit = function() {
        if($scope.register.$valid) {
            $http({
                method: 'POST',
                url: '/api/registration',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($scope.userdata)
            }).then(function(res) {
                if(res.data == 0) {
                    window.location.pathname = '/login';
                }
                else if(res.data == 1) {
                    $scope.error_message = 'Username is exist!';
                }
                else if(res.data == 2) {
                    $scope.error_message = 'Mail is exist!';
                }
                else {
                    $scope.error_message = 'Server error';
                }
            }).catch(function(err) {
                console.log(err);
                $scope.error_message = 'Server error';
            });
        }
    }
}]);

app.controller('login', ['$scope', '$http', function($scope, $http) {
    $scope.userdata = {};
    $scope.error_message = null;
    $scope.submit = function() {
        if($scope.login.$valid) {
            $http({
                method: 'POST',
                url: '/api/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($scope.userdata)
            }).then(function(res) {
                if(res.data == 0) {
                    window.location.pathname = '/cabinet';
                }
                else {
                    $scope.error_message = 'Incorrect login or password!';
                }
            }).catch(function(err) {
                console.log(err);
                $scope.error_message = 'Server error';
            });
        }
    }
}]);

app.controller('tables',  ['$scope', 'allSymbols', function($scope, allSymbols) {
    allSymbols.then(function(symbols) {
        $scope.symbol_types = symbols;
    }).catch(function(err) {
        console.log(err);
        $scope.error_message = 'Server error';
    });
}]);

app.controller('allCharts', ['$scope', 'getQuotes', 'allSymbols', function($scope, getQuotes, allSymbols) {
    $scope.period = 'hour';
    $scope.symbol = {
        name: 'EUR/USD',
        code: 'EURUSD'
    };
    $scope.get_class_period = function(period) {
        if($scope.period == period) {
            return 'btn btn-primary';
        }
        else {
            return 'btn btn-default';
        }
    };
    $scope.get_class_symbol = function(symbol) {
        if($scope.symbol.code == symbol) {
            return 'primary-symbol';
        }
        else {
            return '';
        }
    };
    $scope.change_period = function(period) {
        $scope.period = period;
        $scope.create_chart();
    };
    $scope.change_symbol = function(symbol) {
        $scope.symbol = symbol;
        $scope.create_chart();
    };
    $scope.create_chart = function() {
        getQuotes($scope.symbol.code, $scope.period).then(function(quotes) {
            generate_chart(quotes, $scope.symbol.name + ' (' + $scope.period + ')', $scope.period);
            $scope.quotes = quotes;
        }).catch(function (err) {
            console.log(err);
            $scope.error_message = 'Server error';
        });
    };
    // start
    allSymbols.then(function(symbols) {
        $scope.symbol_types = symbols;
    }).catch(function(err) {
        console.log(err);
        $scope.error_message = 'Server error';
    });
    $scope.create_chart();
}]);

app.controller('creatingAccount', ['$scope', 'getCategories', function($scope, getCategories) {
    getCategories.then(function(types) {
        $scope.types = types.data;
    }).catch(function(err) {
        console.log(err);
        $scope.error_message = 'Server error';
    });
}]);