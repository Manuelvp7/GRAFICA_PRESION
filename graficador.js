// CLASE
let measurePMap = new WeakMap
class measureP {
    constructor(date, dataPM) {
        measurePMap.set(this, {
            date: date,
            dataPM: dataPM
        })
    }

    set setDate(date) {
        measurePMap.get(this).date = date
    }

    set setDataPM(dataPM) {
        measurePMap.get(this).dataPM = dataPM
    }

    get getDate() {
        return measurePMap.get(this).date
    }
    get getDataPM() {
        return measurePMap.get(this).dataPM
    }
}

var timeFormat = "MM/DD/YYYY HH:mm:ss";
const measures = []
const dateF = []
const dataF = []
let error = 0
const totalDuration = 10000;

const fileSelector = document.getElementById('fileTxt');
//const fileSelector = document.getElementById('file-selector');
if (fileSelector) {
    fileSelector.addEventListener('change', openFile);
}

function openFile(event) {
    let file = event.target.files[0]
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result;
            row = content.split('\r\n')
            row.pop()
            for (r in row) {
                x = row[r]
                if (isNaN(x.substring(22, 26))) {
                    error += 1
                } else {
                    newMeasureP = new measureP(x.substring(0, 20), x.substring(22, 26))
                        // data.push(x.substring(22,31))
                }
                measures.push(newMeasureP)

            }
            console.log(measures)
            console.log("Inconcistencias encontradas: " + error)
                // OTRA FORMA DE LLAMAR LOS DATOS PARA LA GRAFICA
            for (var i = 0; i < measures.length; i++) {
                dateF.push(measures[i].getDate)
                dataF.push(measures[i].getDataPM)
            }
            console.log(dataF)
            console.log(dateF)

            // Graficar
            var ctx = document.getElementById("canvas").getContext("2d");
            window.myLine = new Chart(ctx, config);
            createTable()
        }
        reader.readAsText(file)
    } else {
        document.getElementById('mesageError').innerText = "No se a seleccionado";
    }
}

function randomColorFactor() {
    return Math.round(Math.random() * 255);
}

function createTable() {
    const tableBody = document.getElementById("tableData")
    let dataHtml = ''
        // console.log("TABLE")
    for (var i = 0; i < measures.length; i++) {
        dataHtml += `<tr><td>${measures[i].getDate}</td><td>${measures[i].getDataPM}</td></tr>`
    }
    tableBody.innerHTML = dataHtml
}

function searchWord() {
    const searchInput = document.getElementById("myInput")
    const rows = document.querySelectorAll("tbody tr")
        // console.log("Filtro tabla")
        // console.log(rows)
    const q = searchInput.value.toLowerCase()
        // console.log(q)
    rows.forEach((row) => {
        row.querySelector("td").textContent.toLowerCase().startsWith(q) ? (row.style.display = "table-row") : (row.style.display = "none")
    })
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
        labels: dateF, // Date Objects
        datasets: [{
            label: "Presion",
            data: dataF,
        }]
    },
    options: {
        responsive: true,
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
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
                // max: 300,
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
        },
        plugins: {
            legend: {
                display: false
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: "xy"
                },
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