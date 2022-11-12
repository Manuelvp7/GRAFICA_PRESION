
// const Chart = require('chart.js');
require('chart');

var timeFormat = "MM/DD/YYYY HH:mm:ss";
const date = []
const data = []
let error = 0
const totalDuration = 10000;
const delayBetweenPoints = 0;


// const fileSelector = document.getElementById('file-selector');

// fileSelector.addEventListener('change', openFile);

function openFile(event) {
    let file = event.target.files[0]
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result;
            row = content.split('\r\n')
                console.log(row)
            for (r in row) {
                x = row[r]
                    // console.log(x.substring(22, 26))
                if (isNaN(x.substring(22, 26))) {
                    error += 1
                } else {
                    date.push(x.substring(0, 20))
                    data.push(x.substring(22, 26))
                        // console.log(r, date, data)
                        // data.push(x.substring(22,31))
                }
            }
            console.log(date)
            console.log(data)
            console.log("Inconcistencias encontradas: " + error)

            // Graficar
            var ctx = document.getElementById("canvas").getContext("2d");
            window.myLine = new Chart(ctx, config);
        }
        reader.readAsText(file)
    } else {
        document.getElementById('mesageError').innerText = "No se a seleccionado";
    }

}

function randomColorFactor() {
    return Math.round(Math.random() * 255);
}

function randomColor(opacity) {
    return (
        "rgba(" +
        randomColorFactor() +
        "," +
        randomColorFactor() +
        "," +
        randomColorFactor() +
        "," +
        (opacity || ".3") +
        ")"
    );
}

function resetZoom() {
    window.myLine.resetZoom();
}

function zoom(value) {
    window.myLine.zoom(value)
}
var config = {
    type: "line",
    data: {
        labels: date, // Date Objects
        datasets: [{
            label: "Presion",
            data: data,
            fill: true,
            // borderDash: [5, 5]
        }]
    },
    options: {
        responsive: true,
        animation: {
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data') {
                    // delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    delay = context.dataIndex + context.datasetIndex;
                }
                return delay;
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fecha',
                    color: '#191',
                    font: {
                        family: 'Times',
                        size: 20,
                        weight: 'bold',
                        lineGeight: 1.2,
                    },
                },
                // min: 0,
                // max: 10,
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: 0,
                max: 10,
                title: {
                    display: true,
                    text: 'Presion',
                    color: '#191',
                    font: {
                        family: 'Times',
                        size: 20,
                        weight: 'bold',
                        lineGeight: 1.2,
                    },
                },
            },
            // y1: {
            //     type: 'linear',
            //     display: true,
            //     position: 'right',
            // }
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    //  Seleccionar el area
                    // drag: {
                    //     enabled: true,
                    //     threshold: 100,
                    //     borderColor: 1,
                    //     borderColor: 'rgb(255, 99, 132,1)',
                    // },
                    pinch: {
                        enabled: true
                    },
                    mode: "xy"
                },
                // animation: {
                //     duration: 100000,
                //     easing: 'easeOutCubic',
                // },
                pan: {
                    enabled: true
                }
            }
        }
    }
};
config.data.datasets.forEach(function(dataset) {
    dataset.borderColor = randomColor(0.4);
    dataset.backgroundColor = randomColor(0.5);
    dataset.pointBorderColor = randomColor(0.7);
    dataset.pointBackgroundColor = randomColor(0.5);
    dataset.pointBorderWidth = 1;
});

// Animation chart
// const totalDuration = 10000;
// const delayBetweenPoints = totalDuration / data.length;
// const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
// const animation = {
//     x: {
//         type: 'number',
//         easing: 'linear',
//         duration: delayBetweenPoints,
//         from: NaN,
//         delay(ctx) {
//             if (ctx.type !== 'data' || ctx.xStarted) {
//                 return 0;
//             }
//             ctx.xStarted = true;
//             return ctx.index * delayBetweenPoints;
//         }
//     },
//     y: {
//         type: 'number',
//         easing: 'linear',
//         duration: delayBetweenPoints,
//         from: previousY,
//         delay(ctx) {
//             if (ctx.type !== 'data' || ctx.yStarted) {
//                 return 0;
//             }
//             ctx.yStarted = true;
//             return ctx.index * delayBetweenPoints;
//         }
//     }
// };
// window.onload = function() {
//     var ctx = document.getElementById("canvas").getContext("2d");
//     window.myLine = new Chart(ctx, config);
// };