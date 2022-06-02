const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"


axios
  .get(apiUrl)
  .then(responseFromAPI => {
    console.log('The response from API: ', responseFromAPI);
    printTheChart(responseFromAPI.data);
  })
  .catch(err => console.log('Error while getting the data: ', err));

  function printTheChart(stockData) {
    const dailyData = stockData.bpi;
   
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => dailyData[date]);
   
    const ctx = document.getElementById('my-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockDates,
        datasets: [
          {
            label: 'Bitcoins Price Index',
            backgroundColor: 'rgba(128, 128, 128, 0.5)',
            borderColor: 'rgba(128, 128, 128, 0.7)',
            pointBackgroundColor: 'rgba(128, 128, 128, 0.5)',
            pointRadius: 4,
            data: stockPrices
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()