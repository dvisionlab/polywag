# DIGLETT :chart_with_upwards_trend:	

A data visualization library built on top of Plotly.js 

## API

See /docs/index.html

## EXAMPLE

    let data = {
        value: [1,2,3,4,5],
        timestamps: [1598368228264, 1598368240796, 1598368248441, 1598368256295, 1598368263938]
    }

    let hm = new TimeseriesComponent("chart-container", { title: "A chart", color: "Viridis" };

    hm.update(data);