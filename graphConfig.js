const config = ( graphDates, graphPreassures) => {
    

    return {
        type: "line",
        data: {
            labels: graphDates,
            datasets: [{
                label: "Presion",
                data: graphPreassures,
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
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
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',

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
}




