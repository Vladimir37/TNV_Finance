function generate_chart(quotes) {
    var chart = new CanvasJS.Chart( 'chartdiv', {
        title: {
            text: "Tata Motors Stock Prices Sep - 2014"
        },
        zoomEnabled: true,
        axisY: {
            includeZero: false,
            title: "Price (INR)"
        },
        axisX: {
            intervalType: "hour",
            interval: 1,
          valueFormatString: "DD hh:mm"
        },
        toolTip: {
        content: "{x} Sep 2014 <br/> <strong>Prices (INR):</strong> <br/>Open: {y[0]}, Close: {y[3]} <br/> Low: {y[2]}, High: {y[1]}"
        },
        data: [
        {
            type: "candlestick",
            dataPoints: [
                {x:new Date(2014,8,1,20), y:[526.00, 529.45, 517.10, 519.85]},
                {x:new Date(2014,8,1,21), y:[518.00, 520.50, 512.00, 516.40]},
                {x:new Date(2014,8,1,22), y:[526.00, 530.50, 521.35, 522.65]},
                {x:new Date(2014,8,1,23), y:[522.65, 522.65, 509.00, 512.85]}]
        }
        ]
    });
    chart.render();
}