import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import coinReducer from "./reducers/coinReducer";

import thunk from "redux-thunk";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { UPDATE_COIN,ADD_COIN } from "./actions";

//import { updateCoin } from "./actions";

const initialState = {
  coinList: [
    { id: "ETHBTC", price: 0 },
    { id: "XLMBTC", price: 0 },
    { id: "TUSDBTC", price: 0 },
    { id: "BTCUSDT", price: 0 }
  ]
};

const rootReducers = combineReducers({
  coinList: coinReducer
});

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  rootReducers,
  {
    coinList: initialState
  },
  allStoreEnhancers
);




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

console.log("State" + store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("usc " + store.getState())
);
//var coins = [{ id: "ETHBTC", price: 1 }, { id: "XLMBTC", price: 2 }];
//store.dispatch(updateCoin(coins[0]));
//store.dispatch(updateCoin(coins[1]));

unsubscribe();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
