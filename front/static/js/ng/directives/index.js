app.directive('chart', function() {
    return {
        restrict: 'E',
        scope: {
            quotes: '=',
            events: '=',
            symbol: '=',
            period: '='
        },
        link: function($scope) {
            $scope.$watch('quotes', function() {
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
                        data: $scope.quotes || null
                    }, {
                        type: 'flags',
                        name: 'Position events',
                        data: $scope.events,
                        onSeries: 1,
                        shape: 'squarepin'
                    }],
                    title: {
                        text: $scope.symbol + ' (' + $scope.period + ')'
                    },
                    useHighStocks: true
                };
            });
        },
        templateUrl: '/static/js/ng/directives/chart.html'
    };
});