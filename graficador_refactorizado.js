let graphData = [];
let sortGraphData;
let dates = [];
let preassures = [];
let myChart;

//Referencias de HTML
const btnSelectFile = document.querySelector('#fileTxt');
const graphCanvas = document.querySelector('#canvas');
const tableBody = document.querySelector("#tableData");

const filterByDates = (date) => {
    let elements = graphData.filter(element => element.date > date)
}

// Leer archivo
function readFileAsText(file) {
    return new Promise(function(resolve, reject) {
        let fr = new FileReader();

        fr.onload = function() {
            resolve(fr.result);
        };

        fr.onerror = function() {
            reject(fr);
        };

        fr.readAsText(file);
    });
}

// Manejar múltiples cargas de archivos
document.getElementById("fileTxt").addEventListener("change", function(ev) {
    let files = ev.currentTarget.files;
    let readers = [];

    // Abortar si no hubo archivos seleccionados
    if (!files.length) return;

    // Almacenar promesas en matriz
    for (let i = 0; i < files.length; i++) {
        readers.push(readFileAsText(files[i]));
    }

    // Activar promesas
    Promise.all(readers).then((values) => {
        // Los valores serán una matriz que contiene un elemento.
        // ["File1 Content", "File2 Content" ... "FileN Content"]
        for (var i = 0; i < values.length; i++) {
            let rows = values[i].split('\r\n');

            for (let i in rows) {
                let rowValues = rows[i].split('\t');
                let date = rowValues[0];
                let preassure = rowValues[2];
                if (!(isNaN(preassure))) {
                    graphData.push({
                        'date': date,
                        'preassure': Number(preassure.split('E-')[0])
                    });
                }
            }
        }
        // Ornedar graphData
        sortGraphData = graphData.sort((a, b) => {
            return a.date - b.date
        })
        renderGraph()
        createTable()
        graphData = [];
        sortGraphData = [];
    });
}, false);




// const readFile = async(file) => {

//     let reader = new FileReader();
//     reader.onload = (evt) => {

//         let content = evt.target.result;
//         let rows = content.split('\r\n');

//         for (let i in rows) {
//             let rowValues = rows[i].split('\t');
//             let date = rowValues[0];
//             let preassure = rowValues[2];
//             if (!(isNaN(preassure))) {
//                 graphData.push({
//                     'date': date,
//                     'preassure': Number(preassure.split('E-')[0])
//                 });
//             }
//         }
//         console.log(graphData)
//         renderGraph();
//         createTable();
//         graphData = [];
//         console.log(graphData)

//     }
//     reader.readAsText(file);
// }

const createTable = () => {
    let dataHtml = ''
    for (var element of sortGraphData) {
        dataHtml += `<tr><td>${element.date}</td><td>${element.preassure}</td></tr>`
    }
    tableBody.innerHTML = dataHtml
}

const renderGraph = () => {
    let ctx = graphCanvas.getContext("2d");
    dates = sortGraphData.map(element => element.date);
    preassures = sortGraphData.map(element => element.preassure);
    // dates = graphData.map(element => element.date);
    // preassures = graphData.map(element => element.preassure);
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, config(dates, preassures));
}

function resetZoom() {
    myChart.resetZoom();
}

function zoom(value) {
    myChart.zoom(value)
}

//Eventos
// btnSelectFile.addEventListener('input', async(event) => {
//     let file = event.target.files[0];
//     if (file) {
//         await readFile(file).then(console.log('test'));
//     }
// });