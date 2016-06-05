app.directive('chart', function() {
    return {
        restrict: 'E',
        scope: {
            quotes: '=',
            events: '=',
            symbol: '=',
            period: '='
        },
        link: function($scope, element, attrs) {
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
                        data: $scope.quotes || []
                    }],
                    title: {
                        text: $scope.symbol + ' (' + $scope.period + ')'
                    },
                    useHighStocks: true
                };
            });
        },
        template: '<highchart id="chart1" config="chartConfig" class="span10"></highchart>'
    };
});