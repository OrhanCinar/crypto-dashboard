import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { applyMiddleware, compose, createStore,combineReducers } from "redux";
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
  allCoins : [{
    id : 1, name : 'Test'
  }]
};

const rootReducers = combineReducers({
  coinReducer : coinReducer
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
