app.controller('indexSymbols', ['$scope', 'indexValues', function($scope, indexValues) {
    indexValues.then(function(data) {
        var qw = decodeHtml(data.data);
        console.log(JSON.parse(qw));
        $scope.symbol_values = [{
            data: 1
        }, {
            data: 2
        }];
    }).catch(function(err) {
        console.log('ERROR');
        console.log(err);
    });
}]);