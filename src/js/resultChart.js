var ctx = document.getElementById('myChart');

var scatterChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      data: [{
        x: 20,
        y: 1
      }, {
        x: 43,
        y: 2
      }, {
        x: 10,
        y: 3
      }],
      showLine: true,
      lineTension: 0,
      fill: false
    }],
  },
  options: {
    animation: {
      duration: 0
    },
    hover: {
      animationDuration: 0
    },
    responsiveAnimationDuration: 0,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'top'
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