app.factory('indexValues', ['$http', function($http) {
    var requested_symbols = [{
        code: 'EURUSD',
        name: 'EURUSD'
    }, {
        code: 'GBP',
        name: 'GBPUSD'
    }, {
        code: 'YHOO',
        name: 'YHOO'
    }, {
        code: 'MSFT',
        name: 'MSFT'
    }, {
        code: 'AUD',
        name: 'AUDUSD'
    }, {
        code: 'DAX',
        name: 'DAX'
    }];
    var symbols_req = {
        symbols: JSON.stringify(_.pluck(requested_symbols, 'code'))
    };
    return $http({
        url: '/api/get_current_many',
        method: 'GET',
        params: symbols_req
    }).then(function(values) {
        var num = 0;
        var values = values.data;
        for(var symbol in values) {
            var state = values[symbol].state;
            values[symbol] = {
                price: values[symbol].price,
                name: requested_symbols[num].name,
                color: state > 0.5 ? 'red' : 'green',
                arrow: state > 0.5 ? 'a_down.png' : 'a_up.png'
            }
            num++;
        }
        return values;
    }).catch(function(err) {
        return err;
    });
}]);

app.factory('allSymbols', ['$http', function($http) {
    return $http({
        url: '/api/symbols',
        method: 'GET'
    }).then(function(symbols_obj) {
        symbols_obj = symbols_obj.data;
        var symbols_arr = [];
        for (var type in symbols_obj) {
            symbols_obj[type].forEach(function (symbol) {
                symbols_arr.push(symbol.code);
            });
        }
        var symbols_req = {
            symbols: JSON.stringify(symbols_arr)
        };
        $http({
            url: '/api/get_current_many',
            method: 'GET',
            params: symbols_req
        }).then(function (symbols_price) {
            symbols_price = symbols_price.data;
            for (var type in symbols_obj) {
                symbols_obj[type].forEach(function (symbol) {
                    var state = symbols_price[symbol.code].state;
                    symbol.price = symbols_price[symbol.code].price;
                    symbol.color = state > 0.5 ? 'red' : 'green';
                    symbol.arrow = state > 0.5 ? 'a_down.png' : 'a_up.png';
                });
            }
            return symbols_obj;
        }).catch(function (err) {
            return err;
        });
        return symbols_obj;
    }).catch(function(err) {
        return err;
    });
}]);

app.factory('getQuotes', ['$http', function($http) {
    return function(symbol, period) {
        var params = {
            symbol: symbol,
            period: period
        };
        return $http({
            url: '/api/get_quotes',
            method: 'GET',
            params: params
        }).then(function (data) {
            var values = data.data.body.map(function(item) {
                var result_arr = [];
                result_arr.push(item.date);
                result_arr.push(item.open);
                result_arr.push(item.max);
                result_arr.push(item.min);
                result_arr.push(item.close);
                return result_arr;
            });
            return values;
        }).catch(function (err) {
            return err;
        });
    }
}]);

app.factory('getCategories', ['$http', function($http) {
    return $http({
        url: '/api/types',
        method: 'GET'
    }).then(function(data) {
        return data;
    }).catch(function(err) {
        return err;
    });
}]);

app.factory('getAccounts', ['$http', function($http) {
    return function (active) {
        var params = {
            active: active
        };
        return $http({
            url: '/api/get_accounts',
            method: 'GET',
            params: params
        }).then(function(data) {
            return data;
        }).catch(function(err) {
            return err;
        });
    }
}]);

app.factory('getPositions', ['$http', function($http) {
    return function (active, account) {
        var params = {
            active: active,
            account: account
        };
        return $http({
            url: '/api/get_positions',
            method: 'GET',
            params: params
        }).then(function(data) {
            return data;
        }).catch(function(err) {
            return err;
        });
    }
}]);

app.factory('getAccountData', ['$http', function($http) {
    return function(num) {
        return $http({
            url: '/api/get_account_data',
            method: 'GET',
            params: {account: num}
        }).then(function (data) {
            return data;
        }).catch(function (err) {
            return err;
        });
    }
}]);