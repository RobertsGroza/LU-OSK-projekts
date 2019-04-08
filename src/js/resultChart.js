// Function for drawing chart (Chart.js)
function drawChart(cylinderArray) {
  var ctx = document.getElementById('myChart');

  Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {});

  // Create points array for scatter chart from given cilinder array
  let pointsArray = Object.assign([], cylinderArray);
  pointsArray.map(function(el, index, arr) {
    arr[index] = {x: el, y: index + 1};
  });

  let scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        data: pointsArray,
        showLine: true,
        lineTension: 0,
        fill: false,
        backgroundColor: '#4267b2',
        borderColor: '#4267b2',
      }],
    },
    options: {
      layout: {
        padding: {
          left: 15,
          right: 15,
          top: 15,
          bottom: 25,
        }
      },
      legend: {
        display: false
      },
      plugins: {
        datalabels: {
          color: '#000000',
          align: 'bottom',
          formatter: function (value, context) {
            return value.x
          },
          font: {
            weight: 'bold'
          }
        }
      },
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'top',
          ticks: {
            display: false
          },
          afterBuildTicks: function (scatterChart, pointsArray) {
            scatterChart.ticks = [];

            cylinderArray.map(function(element) {
              scatterChart.ticks.push(element);
            });
          }
        }],
        yAxes: [{
          type: 'linear',
          ticks: {
            stepSize: 1,
            reverse: true,
            display: false
          }
        }]
      }
    }
  });
}