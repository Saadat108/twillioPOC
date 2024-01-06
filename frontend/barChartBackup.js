const ctx = document.getElementById('barChart').getContext('2d');
const pieCt = document.getElementById('pieChart').getContext('2d');
const doughnutCt = document.getElementById('doughnutChart').getContext('2d');


function generateChart(label, data){}


function generateFakeChart(){
    const fakeLabels = ['1day','2day','3day','4day','5day','6day','7day']
    
}

// backgroundColor: 'rgba(255, 99, 132, 0.2)',
// borderColor: 'rgba(255, 99, 132, 1)',

data = {
    labels: ['1day','2day','3day','4day','5day','6day','7day'],
    datasets: [
        {
          label: 'Pass',
          data: [1,3,5,7,9,11,13],
        //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //   borderColor: 'rgba(255, 99, 132, 1)',

        },
        {
          label: 'Fail',
          data: [2,4,6,8,10,12,14],
        //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //   borderColor: 'rgba(255, 99, 132, 1)',
        },
        {
            label: 'Going',
            data: [3,1,1,5,11,21,41],
            // backgroundColor: 'rgba(255, 99, 132, 0.2)',
            // borderColor: 'rgba(255, 99, 132, 1)',
          }

      ]
  };

const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      }
    },
};

options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

const barChart = new Chart(ctx, {
  type: 'bar', // Specify the chart type (bar, line, pie, etc.)
  data: data,
  options: {
    // Chart configuration options
  }
});

pieData = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Pass',
        'Fail',
        'Through'
    ]
};

const pieChart = new Chart(pieCt, {
    type: 'pie', // Specify the chart type (bar, line, pie, etc.)
    data: pieData,
    options: {
      // Chart configuration options
    }
  });

  const doughnutChart = new Chart(doughnutCt, {
    type: 'doughnut', // Specify the chart type (bar, line, pie, etc.)
    data: pieData,
    options: {
      // Chart configuration options
    }
  });