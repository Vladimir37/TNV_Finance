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
                    window.location.pathname = '/accounts';
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
                window.location.pathname = '/accounts';
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

app.controller('listAccounts', ['$scope', '$http', 'getAccounts', function($scope, $http, getAccounts) {
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
    $scope.deleteAccount = function(acc_num) {
        $http({
            method: 'POST',
            url: '/api/delete_account',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({account: acc_num})
        }).then(function(res) {
            if(res.data == 0) {
                $scope.loading();
            }
            else {
                $scope.error_message = 'Incorrect data!';
            }
        }).catch(function(err) {
            console.log(err);
            $scope.error_message = 'Server error';
        });
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

app.controller('listPositions', ['$scope', '$http', 'getQuotes', 'getPositions', function($scope, $http, getQuotes, getPositions) {
    $scope.active = 1;
    $scope.active_pos = null;
    $scope.period = 'day';
    $scope.change_active = function(active) {
        $scope.active = active;
        $scope.loading();
    };
    $scope.change_pos = function(acc) {
        for(var position in $scope.positions) {
            if($scope.positions[position].id == acc) {
                $scope.active_pos = $scope.positions[position];
                break;
            }
        }
    };
    $scope.check_type = function(type) {
        if(type) {
            return 'Buy';
        }
        else {
            return 'Sell';
        }
    };
    $scope.check_active = function(pos) {
        if(pos.active) {
            return 'Opened';
        }
        else {
            return 'Closed';
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
    $scope.get_class_pos = function(pos) {
        if($scope.active_pos.id == pos) {
            return 'active';
        }
        else {
            return '';
        }
    };
    $scope.get_closing_way = function(num) {
        if(num == 0) {
            return 'Manually';
        }
        else if(num == 1) {
            return 'Take-Profit';
        }
        else if(num == 2) {
            return 'Stop-Loss';
        }
        else if(num == 3) {
            return 'Margin Call';
        }
        else {
            return '';
        }
    };
    // chart
    $scope.get_class_period = function(period) {
        if($scope.period == period) {
            return 'btn btn-primary';
        }
        else {
            return 'btn btn-default';
        }
    };
    $scope.change_period = function(period) {
        $scope.period = period;
        $scope.create_chart();
    };
    $scope.closing = function(num) {
        var req_data = {
            account: account_num,
            position: num
        };
        $http({
            method: 'POST',
            url: '/api/close_position',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param(req_data)
        }).then(function(res) {
            if(res.data == 0) {
                $scope.loading();
            }
            else {
                $scope.error_message = 'Server error';
            }
        }).catch(function(err) {
            console.log(err);
            $scope.error_message = 'Server error';
        });
    };
    $scope.create_chart = function() {
        if($scope.active_pos) {
            getQuotes($scope.active_pos.symbol, $scope.period).then(function(quotes) {
                $scope.quotes = quotes;
            }).catch(function (err) {
                console.log(err);
                $scope.error_message = 'Server error';
            });
        }
    };
    $scope.loading = function() {
        getPositions($scope.active, account_num).then(function (positions) {
            $scope.positions = positions.data;
            if (positions.data.length) {
                $scope.active_pos = positions.data[0];
            }
            var positions_event = [];
            for(var position in $scope.positions) {
                positions_event.push({
                    x: +new Date($scope.positions[position].start_date),
                    title: 'Open ' + $scope.positions[position].id
                });
                if(!$scope.positions[position].active) {
                    positions_event.push({
                        x: +new Date($scope.positions[position].end_date),
                        title: 'Close ' + $scope.positions[position].id
                    });
                }
            }
            $scope.events = positions_event;
            $scope.create_chart();
        }).catch(function (err) {
            console.log(err);
            $scope.error_message = 'Server error';
        });
    };
    // start
    var account_num = +window.location.hash.slice(1);
    if (!account_num) {
        $scope.error_message = 'Incorrect account!';
    }
    else {
        $scope.loading();
    }
}]);

app.controller('creatingPosition', ['$scope', '$http', 'getQuotes', 'allSymbols', 'getAccountData', function($scope, $http, getQuotes, allSymbols, getAccountData) {
    $scope.period = 'hour';
    $scope.type = 'buy';
    $scope.quotes = [];
    $scope.position_data = {
        value: 0,
        sl: null,
        tp: null
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
    $scope.change_type = function(type) {
        $scope.type = type;
    };
    $scope.get_class_type = function(type) {
        if($scope.type == type) {
            return 'btn btn-primary';
        }
        else {
            return 'btn btn-default';
        }
    };
    $scope.get_order_word = function(type, order, price) {
        price = parseFloat(price);
        if(type == 'buy' && order == 'tp') {
            return 'not less than ' + (price + 0.1).toFixed(4);
        }
        else if(type == 'sell' && order == 'tp') {
            return 'not more than ' + (price - 0.1).toFixed(4);
        }
        else if(type == 'buy' && order == 'sl') {
            return 'not more than ' + (price - 0.1).toFixed(4);
        }
        else if(type == 'sell' && order == 'sl'){
            return 'not less than ' + (price + 0.1).toFixed(4);
        }
        else {
            return 'Incorrect';
        }
    };
    $scope.create_chart = function() {
        getQuotes($scope.symbol.code, $scope.period).then(function(quotes) {
            $scope.quotes = quotes;
        }).catch(function (err) {
            console.log(err);
            $scope.error_message = 'Server error';
        });
    };
    $scope.submit = function() {
        var req_data = angular.copy($scope.position_data);
        req_data.type = $scope.type;
        req_data.symbol = $scope.symbol.code;
        req_data.account = account_num;
        if(!$scope.position_data.value) {
            $scope.error_message = 'Required fields are empty!';
        }
        else {
            $scope.error_message = null;
            $http({
                method: 'POST',
                url: '/api/create_position',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(req_data)
            }).then(function (res) {
                if (res.data == 0) {
                    $scope.success_message = 'Position was created!';
                    $scope.loading();
                }
                else {
                    $scope.error_message = 'Position can not be opened';
                }
            }).catch(function (err) {
                console.log(err);
                $scope.error_message = 'Server error';
            });
        }
    };
    $scope.loading = function() {
        allSymbols.then(function(categories) {
            $scope.categories = categories;
            return getAccountData(account_num)
        }).then(function(acc_data) {
            $scope.acc = acc_data.data;
            $scope.symbols = $scope.categories[$scope.acc.category];
            $scope.symbol = $scope.symbols[0];
            $scope.create_chart();
        }).catch(function (err) {
            $scope.error_message = 'Server error';
            console.log(err);
        });
    };
    // start
    var account_num = +window.location.hash.slice(1);
    if (!account_num) {
        $scope.error_message = 'Incorrect account!';
    }
    else {
        $scope.loading();
    }
}]);

app.controller('personal', ['$scope', '$http', function($scope, $http) {
    $scope.pass = {};
    $scope.pass_message = null;
    $scope.success_message = null;
    $scope.change_pass = function() {
        if(!$scope.pass.new1 || !$scope.pass.new2 || !$scope.pass.old) {
            $scope.pass_message = 'Required fields are empty!'
        }
        else if($scope.pass.new1 != $scope.pass.new2) {
            $scope.pass_message = 'Entered passwords are not identical!'
        }
        else {
            var req_data = {
                old_password: $scope.pass.old,
                new_password: $scope.pass.new1
            };
            $http({
                method: 'POST',
                url: '/api/pass_change',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(req_data)
            }).then(function(response) {
                if(response.data == 0) {
                    $scope.pass_message = null;
                    $scope.success_message = 'Password was changed!';
                    $scope.pass = {};
                }
                else {
                    $scope.pass_message = 'Incorrect old password!';
                }
            }).catch(function (err) {
                $scope.error_message = 'Server error';
                console.log(err);
            });
        }
    };
    $scope.loading = function() {
        $http({
            method: 'GET',
            url: '/api/statistic',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(user_data) {
            $scope.user_data = user_data.data;
        }).catch(function (err) {
            $scope.error_message = 'Server error';
            console.log(err);
        });
    };
    // start
    $scope.loading();
}]);