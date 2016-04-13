app.controller('indexSymbols', ['$scope', 'indexValues', function($scope, indexValues) {
    indexValues.then(function(data) {
        var values = getAPI(data.data);
        for(var symbol in values) {
            var state = values[symbol].state;
            values[symbol] = {
                price: values[symbol].price,
                color: state > 0.5 ? 'red' : 'green',
                arrow: state > 0.5 ? 'a_down.png' : 'a_up.png'
            }
        };
        console.log(values);
        $scope.symbol_values = values;
    }).catch(function(err) {
        console.log('ERROR');
        console.log(err);
    });
}]);