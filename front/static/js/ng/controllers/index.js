app.controller('indexSymbols', ['$scope', 'indexValues', function($scope, indexValues) {
    indexValues.then(function(data) {
        var values = data.data;
        for(var symbol in values) {
            var state = values[symbol].state;
            values[symbol] = {
                price: values[symbol].price,
                color: state > 0.5 ? 'red' : 'green',
                arrow: state > 0.5 ? 'a_down.png' : 'a_up.png'
            }
        }
        $scope.symbol_values = values;
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
        console.log(symbols);
    });
}]);