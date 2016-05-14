function generate_chart(quotes, name) {
    var chart = new CanvasJS.Chart( 'chartdiv', {
        title: {
            text: name
        },
        zoomEnabled: true,
        axisY: {
            includeZero: false,
            title: "Price"
        },
        axisX: {
            intervalType: "hour",
            interval: 1,
            valueFormatString: "hh:mm",
            labelFontSize: 10
        },
        toolTip: {
        content: "{x} {full_date} <br/> <strong>Price:</strong> <br/>Open: {y[0]}, Close: {y[3]} <br/> Low: {y[2]}, High: {y[1]}"
        },
        data: [{
            type: "candlestick",
            dataPoints: quotes
        }]
    });
    chart.render();
}