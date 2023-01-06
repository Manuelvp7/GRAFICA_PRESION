const config = (graphDates, graphPreassures, graphMultis) => {

    return {
        type: "line",
        data: {
            labels: graphDates,
            datasets: [{
                label: "Presion",
                data: graphPreassures,
                pointBackgroundColor: '#191',
            }]
        },
        options: {
            responsive: true,
            // Multi
            tooltips: {
                callbacks: {
                    label: function(t, d) {
                        var xLabel = d.datasets[t.datasetIndex].label;
                        var yLabel = t.yLabel + 'E';
                        return xLabel + ': ' + yLabel;
                    }
                }
            },
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
                        text: 'Presion (mbar)',
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