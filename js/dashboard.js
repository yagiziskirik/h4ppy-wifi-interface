// Copyright (c) 2022 Yağız Işkırık
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const optCreator = (val, name) => {
    var options = {
        series: [val],
        chart: {
            width: '100%',
            type: 'radialBar',
            toolbar: {
                show: false
            },
            fontFamily: 'Roboto Condensed'
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: undefined,
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: '#ffffff12',
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },

                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -14,
                        show: true,
                        color: '#888',
                        fontSize: '1.2rem'
                    },
                    value: {
                        formatter: function (val) {
                            return parseInt(val)+"%";
                        },
                        offsetY: -2,
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        show: true,
                    }
                }
            }
        },
        fill: {
            colors: ['#f5c265'],
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#e5a245'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: [name],
    };
    return options;
}

var chart1 = new ApexCharts(document.querySelector("#chart1"), optCreator(13, 'CPU'));
chart1.render();
var chart2 = new ApexCharts(document.querySelector("#chart2"), optCreator(22, 'RAM'));
chart2.render();
var chart3 = new ApexCharts(document.querySelector("#chart3"), optCreator(55, 'Storage'));
chart3.render();
var chart4 = new ApexCharts(document.querySelector("#chart4"), optCreator(77, 'Battery'));
chart4.render();

const redrawAllCharts = () => {
    chart1.destroy();
    chart2.destroy();
    chart3.destroy();
    chart4.destroy();
    chart1 = new ApexCharts(document.querySelector("#chart1"), optCreator(13, 'CPU'));
    chart1.render();
    chart2 = new ApexCharts(document.querySelector("#chart2"), optCreator(22, 'RAM'));
    chart2.render();
    chart3 = new ApexCharts(document.querySelector("#chart3"), optCreator(55, 'Storage'));
    chart3.render();
    chart4 = new ApexCharts(document.querySelector("#chart4"), optCreator(77, 'Battery'));
    chart4.render();
}

window.onresize = () => {
    redrawAllCharts();
}

var uptime = 0;

const parseTime = (t) => {
    var h = Math.floor(t/3600);
    h = h < 10 ? `0${h}` : `${h}`;
    var m = Math.floor(t/60%60);
    m = m < 10 ? `0${m}` : `${m}`;
    var s = t%60 < 10 ? `0${t%60}` : `${t%60}`;
    return `${h}:${m}:${s}`;
}

setInterval(() => {
    uptime++;
    $('#uptime').text(parseTime(uptime));
}, 1000);