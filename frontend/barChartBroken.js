


function generateChart(labels, dataPass, dataFail, dataGoing){

    const ctx = document.getElementById('barChart').getContext('2d');
    const pieCt = document.getElementById('pieChart').getContext('2d');
    const doughnutCt = document.getElementById('doughnutChart').getContext('2d');
    console.log.out('labels: ', labels)
    data = {
        labels: labels,
        datasets: [
            {
              label: 'Pass',
              data: dataPass,
            //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //   borderColor: 'rgba(255, 99, 132, 1)',
    
            },
            {
              label: 'Fail',
              data: dataFail,
            //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //   borderColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Going',
                data: dataGoing,
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
        options: options,
    });
      
    
    








































































































































































































    
      
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

}


function generateFakeChart(){
    console.log('inside geenrate fake chart')
    const fakeLabels = ['1day','2day','3day','4day','5day','6day','7day'];
    const fakePass = [1,3,5,7,9,11,13];
    const fakeFail = [2,4,6,8,10,12,14];
    const fakeGoing = [3,1,1,5,11,21,41];
    generateChart(fakeLabels, fakePass, fakeFail,fakeGoing)
    console.log.out('overwith generate fake chart')
    
}

console.log('inside chart')
generateFakeChart();
console.log('after calling fake taxi chart')
// backgroundColor: 'rgba(255, 99, 132, 0.2)',
// borderColor: 'rgba(255, 99, 132, 1)',







