chartState = {
    
}

function initiateChart(labels, dataPass, dataFail, dataGoing){
    //initiates new charts

    const ctx = document.getElementById('barChart').getContext('2d');
    const pieCt = document.getElementById('pieChart').getContext('2d');
    const doughnutCt = document.getElementById('doughnutChart').getContext('2d');

    const totPass = dataPass.reduce((acc,num) => acc+num, 0);
    const totFail = dataFail.reduce((acc,num) => acc+num, 0);
    const totGoing = dataGoing.reduce((acc,num) => acc+num, 0);
    

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
        options: {
          // Chart configuration options
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });
    
    pieData = {
        datasets: [{
            data: [totPass, totFail, totGoing]
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

    chartState.barChart = barChart;
    chartState.pieChart = pieChart;
    chartState.doughnutChart = doughnutChart;

}


function generateChart(labels, dataPass, dataFail, dataGoing){
    if (Object.keys(chartState).length == 0) {
        initiateChart(labels, dataPass, dataFail, dataGoing);
    }else{
        console.log('labels new chart:', labels)
        chartState.barChart.data.labels = labels;
        chartState.barChart.data.datasets[0].data = dataPass;
        chartState.barChart.data.datasets[1].data = dataFail;
        chartState.barChart.data.datasets[2].data = dataGoing;
        chartState.barChart.update()
        

        const totPass = dataPass.reduce((acc,num) => acc+num, 0);
        const totFail = dataFail.reduce((acc,num) => acc+num, 0);
        const totGoing = dataGoing.reduce((acc,num) => acc+num, 0);

        chartState.pieChart.data.datasets[0].data = [totPass, totFail, totGoing];
        chartState.doughnutChart.data.datasets[0].data = [totPass, totFail, totGoing];
        chartState.pieChart.update();
        chartState.doughnutChart.update();
    }

}

async function generate7daysData(){
  // this is for generating a fake test case with the data stated below
  const today = new Date();
  const sevenDaysBeforeToday = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
  const todayString = today.getFullYear()+'-'+String(today.getMonth() + 1).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');
  const sevenDaysBeforeTodayString = sevenDaysBeforeToday.getFullYear()+'-'+String(sevenDaysBeforeToday.getMonth() + 1).padStart(2, '0')+'-'+String(sevenDaysBeforeToday.getDate()).padStart(2, '0');
  await getMessages(sevenDaysBeforeTodayString, todayString);
  // generateChart(fakeLabels, fakePass, fakeFail,fakeGoing);
       
}

// function generateFakeChart2(){
//   // this is for generating a fake test case with the data stated below
//     console.log('mexi fake 2')
//     const fakeLabels = ['1day','2day','3day','4day','5day','6day','7day']
//     const fakePass = [3,3,3,3,3,3,3];
//     const fakeFail = [1,2,1,8,1,2,1];
//     const fakeGoing = [1,1,1,1,1,1,1];
//     generateChart(fakeLabels, fakePass, fakeFail,fakeGoing);

// }

generate7daysData(); // comment this out in prodoction when Ajax works
// setTimeout(function() {
//     generateFakeChart2();
//   }, 2000);