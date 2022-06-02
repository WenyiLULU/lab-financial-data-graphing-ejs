let fromDate = document.getElementById('fromDate-input').value;
let toDate = document.getElementById('toDate-input').value;
let currency = document.getElementById('currency-input').value;

let apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`


// function getFromDate(){
//     let today = new Date();
//     document.getElementById("fromDate-input").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
// }

function getData(apiUrl){
    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            console.log('The response from API: ', responseFromAPI);
            printTheChart(responseFromAPI.data);
        })
        .catch(err => console.log('Error while getting the data: ', err));
}

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
getData(apiUrl)
document.getElementById('fromDate-input').addEventListener('input', () => {
    fromDate = document.getElementById('fromDate-input').value;
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    getData(apiUrl);
  
  });
  document.getElementById('toDate-input').addEventListener('input', () => {
    toDate = document.getElementById('toDate-input').value;
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    getData(apiUrl);
  
  });
  document.getElementById('currency-input').addEventListener('change', () => {
    currency = document.getElementById('currency-input').value;
    console.log(currency)
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    getData(apiUrl);
  
  });

 