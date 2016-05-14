function generate_chart(quotes, name, period) {
    var intervalType, interval, format;
    if(period == 'min' || period == 'min5' || period == 'min15') {
        intervalType = 'minute';
        format = 'hh:mm';
        interval = 5;
    }
    else if(period == 'min30' || period == 'hour') {
        intervalType = 'hour';
        format = 'hh:mm';
        interval = 1;
    }
    else {
        intervalType = 'day';
        format = 'DD';
        interval = 1;
    }
    var chart = new CanvasJS.Chart('chartdiv', {
        title: {
            text: name
        },
        zoomEnabled: true,
        axisY: {
            includeZero: false,
            title: "Price"
        },
        axisX: {
            intervalType: intervalType,
            interval: interval,
            valueFormatString: format,
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