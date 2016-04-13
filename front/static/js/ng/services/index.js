app.factory('indexValues', ['$http', function($http) {
    var requested_symbols = ['EURUSD', 'GBPUSD', 'YHOO'];
    var symbols_req = {
        symbols: JSON.stringify(requested_symbols)
    };
    return $http({
        url: '/api/get_current_many',
        method: 'GET',
        params: symbols_req
    }).success(function(data) {
        return data;
    }).error(function(err) {
        return err;
    });
}]);