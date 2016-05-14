app.factory('indexValues', ['$http', function($http) {
    var requested_symbols = ['EURUSD', 'GBPUSD', 'YHOO', 'MSFT', 'AUDUSD', 'DAX'];
    var symbols_req = {
        symbols: JSON.stringify(requested_symbols)
    };
    return $http({
        url: '/api/get_current_many',
        method: 'GET',
        params: symbols_req
    }).then(function(values) {
        var values = values.data;
        for(var symbol in values) {
            var state = values[symbol].state;
            values[symbol] = {
                price: values[symbol].price,
                color: state > 0.5 ? 'red' : 'green',
                arrow: state > 0.5 ? 'a_down.png' : 'a_up.png'
            }
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
                var target_date = new Date(item.date);
                if(period != 'min' && period != 'min15' && period != 'min30') {
                    target_date.setMinutes(0);
                }
                target_date.setSeconds(0);
                item.full_date = target_date.toJSON().slice(0, 10);
                item.x = target_date;
                item.y = [];
                item.y.push(item.open);
                item.y.push(item.max);
                item.y.push(item.min);
                item.y.push(item.close);
                return item;
            });
            return values;
        }).catch(function (err) {
            return err;
        });
    }
}]);