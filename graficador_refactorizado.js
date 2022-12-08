
let graphData = [];
let dates = [];
let preassures = [];
let myChart;


//Referencias de HTML
const btnSelectFile = document.querySelector('#fileTxt');
const graphCanvas = document.querySelector('#canvas');
const tableBody = document.querySelector("#tableData");


const filterByDates = ( date ) => {
    let elements = graphData.filter( element => element.date > date )
}

const readFile = async( file ) => {

    let reader = new FileReader();
    reader.onload = (evt) => {

        let content = evt.target.result;
        let rows = content.split('\r\n');
        
        for( let i in rows ){
            let rowValues = rows[i].split('\t');
            let date = rowValues[0];
            let preassure = rowValues[2];
            if(!(isNaN(preassure))){
                graphData.push({ 
                    'date': date,
                    'preassure': Number(preassure.split('E-')[0])
                });
            }
        }
        renderGraph();
        createTable();
    }
    reader.readAsText(file);
}



const createTable = () => {
    let dataHtml = ''
    for( var element of graphData ){
        dataHtml += `<tr><td>${element.date}</td><td>${element.preassure}</td></tr>`
    }
    tableBody.innerHTML = dataHtml
}


const renderGraph = ( ) => {
    let ctx = graphCanvas.getContext("2d");
    dates = graphData.map( element => element.date);
    preassures = graphData.map( element => element.preassure);
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, config( dates, preassures ));
}


//Eventos
btnSelectFile.addEventListener( 'input', async( event ) => {
    let file = event.target.files[0];
    if( file ){    
        await readFile( file ).then( console.log('test') );
    }
});
