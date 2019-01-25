const BASE_URL = "https://api.binance.com";
const API_VERSION_URL = "/api/v1/";
const EXCHANGE_URL = "/exchangeInfo";
const DAILY_TICKER_URL = "/ticker/24hr";
const KLINE_URL = "/klines";

const GET_BASE_URL = `${BASE_URL}${API_VERSION_URL}/`;

export function getDailyTicker() {
  fetch(`${GET_BASE_URL}/${DAILY_TICKER_URL}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log("getDailyTicker err > ", err);
    });
}

export function getExchangeInfo() {
  fetch(`${GET_BASE_URL}/${EXCHANGE_URL}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log("getExchangeInfo err > ", err);
    });
}

export function getKLine() {
  fetch(`${GET_BASE_URL}/${KLINE_URL}?symbol=BTCUSDT&interval=1h`)
    .then(res => res.json())
    .then(res => {
      console.log("getKLine > res > ", res);
      var parsedData = [];

      for (var i = 0; i < res.length; i++) {
        var p = parseKLine(res[i]);
        parsedData.push(p);
      }

      console.log("parsedData", parsedData);
    })
    .catch(err => {
      console.log("getKLine err > ", err);
    });
}

function parseKLine(data) {
  var d = {
    openTime: new Date(data[0]), // unix milisecond
    open: data[1],
    high: data[2],
    low: data[3],
    close: data[4],
    volume: data[5],
    closeTİme: new Date(data[6]) // unix milisecond
  };
  return d;
}

/*
[
  [
    1499040000000,      // Open time 0 
    "0.01634790",       // Open 1
    "0.80000000",       // High 2
    "0.01575800",       // Low 3
    "0.01577100",       // Close 4
    "148976.11427815",  // Volume 5
    1499644799999,      // Close time 6
  ]
]
*/
