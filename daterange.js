let startDay;
let endDay;

$(function() {
    $('input[name="daterange"]').daterangepicker({
            "showDropdowns": true,
            "timePicker": true,
            "timePicker24Hour": true,
            "timePickerSeconds": true,
            "autoApply": true,
            ranges: {
                'Hoy': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
                'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
                'Últimos 90 días': [moment().subtract(89, 'days'), moment()],
                'Últimos 180 días': [moment().subtract(179, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'Último mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            "locale": {
                "format": "DD-MMM-YYYY HH:mm:ss",
                "separator": " - ",
                "customRangeLabel": "Personalizado",
                "daysOfWeek": [
                    "Su",
                    "Mo",
                    "Tu",
                    "We",
                    "Th",
                    "Fr",
                    "Sa"
                ],
                "monthNames": [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                "firstDay": 1
            },
            "startDate": "21-01-2017 06:56:22",
            "endDate": "30-01-2017 23:59:22",
            "opens": "center",
            "drops": "down",
        },
        function(start, end, label) {
            startDay = start.format('DD-MMM-YYYY HH:mm:ss')
            endDay = end.format('DD-MMM-YYYY HH:mm:ss')
            console.log("Seleecion realizada " + startDay + ' - ' + endDay);
        });
});

function filterData() {
    const dates2 = [...dates]
    const data2 = [...preassures]

    // Index
    const indexdStartDate = dates2.indexOf(startDay)
    const indexEndDate = dates2.indexOf(endDay)

    // slice date
    const filterDate = dates2.slice(indexdStartDate, indexEndDate + 1)
    const filterGraphData = data2.slice(indexdStartDate, indexEndDate + 1)

    // Update Chart
    let ctx = graphCanvas.getContext("2d");
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, config(filterDate, filterGraphData));

    // myChart.config.data.labels = filterDate
    // myChart.config.data.datasets[0].data = filterGraphData
    // myChart.update()
}