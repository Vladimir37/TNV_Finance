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
            $scope.chartConfig = {
                options: {
                    chart: {
                        type: 'candlestick',
                        zoomType: 'x'
                    },
                    rangeSelector: {
                        enabled: true
                    },
                    navigator: {
                        enabled: true
                    }
                },
                series: [{
                    id: 1,
                    data: quotes
                }],
                title: {
                    text: $scope.symbol.code + ' (' + $scope.period + ')'
                },
                useHighStocks: true
            };
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

app.controller('creatingAccount', ['$scope', '$http', 'getCategories', function($scope, $http, getCategories) {
    $scope.userdata = {};
    $scope.error_message = null;
    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/api/add_account',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param($scope.userdata)
        }).then(function(res) {
            if(res.data == 0) {
                window.location.pathname = '/cabinet';
            }
            else {
                $scope.error_message = 'Incorrect data!';
            }
        }).catch(function(err) {
            console.log(err);
            $scope.error_message = 'Server error';
        });
    };
    // start
    getCategories.then(function(types) {
        $scope.types = types.data;
    }).catch(function(err) {
        console.log(err);
        $scope.error_message = 'Server error';
    });
}]);

app.controller('listAccounts', ['$scope', 'getAccounts', function($scope, getAccounts) {
    $scope.active = 1;
    $scope.active_acc = null;
    $scope.change_active = function(active) {
        $scope.active = active;
        $scope.loading();
    };
    $scope.change_acc = function(acc) {
        for(var account in $scope.accounts) {
            if($scope.accounts[account].id == acc) {
                $scope.active_acc = $scope.accounts[account];
                break;
            }
        }
    };
    $scope.check_active = function(acc) {
        if(acc.active) {
            return 'Active';
        }
        else {
            return 'Inactive';
        }
    };
    $scope.get_class_activity = function(active) {
        if($scope.active == active) {
            return 'active';
        }
        else {
            return '';
        }
    };
    $scope.get_class_acc = function(acc) {
        if($scope.active_acc.id == acc) {
            return 'active';
        }
        else {
            return '';
        }
    };
    $scope.loading = function() {
        getAccounts($scope.active).then(function (accounts) {
            $scope.accounts = accounts.data;
            if(accounts.data.length) {
                $scope.active_acc = accounts.data[0];
            }
        }).catch(function (err) {
            console.log(err);
            $scope.error_message = 'Server error';
        });
    };
    // start
    $scope.loading();
}]);