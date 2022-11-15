var timeFormat = "MM/DD/YYYY HH:mm:ss";
const date = []
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
            for (r in row) {
                x = row[r]
                if (isNaN(x.substring(22, 26))) {
                    error += 1
                } else {
                    date.push(x.substring(0, 20))
                    dataF.push(x.substring(22, 26))
                        // data.push(x.substring(22,31))
                }
            }
            console.log(date)
            console.log(dataF)
            console.log("Inconcistencias encontradas: " + error)

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
    let size = parseInt(date.length)
    for (let i = 0; i < size; i++) {
        // console.log(date[i], dataF[i])
        dataHtml += `<tr><td>${date[i]}</td><td>${dataF[i]}</td></tr>`
    }
    // console.log(dataHtml)
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
        labels: date, // Date Objects
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