import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import coinReducer from "./reducers/coinReducer";

const initialState = {
  coinList: [
    // { id: "ETHBTC", price: 0 },
    // { id: "XLMBTC", price: 0 },
    // { id: "TUSDBTC", price: 0 },
    // { id: "BTCUSDT", price: 0 }
  ],

  lineChartData: {
    labels: [],
    datasets: [
      {
        type: "line",
        label: "BTCUSDT",
        borderColor: "#EC932F",
        backgroundColor: "#EC932F",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        fill: false,
        borderWidth: "2",
        lineTension: 0.5,
        showLine: true,
        data: []
      }
    ]
  },
  animation: {
    duration: 0 // general animation time
  },
  lineChartOptions: {
    responsive: true,
    maintainAspectRatio: true,
    tooltips: {
      enabled: true
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        }
      ]
    }
  },
  candleStickData: [
    {
      date: new Date(),
      open: 6,
      high: 9,
      low: 8,
      close: 8,
      volume: 100
    }
  ]
};

const rootReducers = combineReducers({
  coinReducer: coinReducer
});

export default rootReducers;

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  rootReducers,
  {
    coinReducer: initialState
  },
  allStoreEnhancers
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
