const BASE_URL = "https://api.binance.com";
const EXCHANGE_URL = "/api/v1/exchangeInfo";
const DAILY_TICKER_URL = "/api/v1/ticker/24hr";

export function getDailyTicker() {
  fetch(`${BASE_URL}/${DAILY_TICKER_URL}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
}

export function getExchangeInfo() {
  fetch(`${BASE_URL}/${EXCHANGE_URL}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
}
