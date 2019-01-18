import { connect } from "react-redux";

//Action Types
export const UPDATE_COIN = "UPDATE_COIN";
export const ADD_COIN = "ADD_COIN";

const BinanceSocket = state => {
  const ALL_MARKET_TICKER = "!miniTicker@arr";
  const SYMBOL_TICKER =
    "ethbtc@miniTicker/xlmbtc@miniTicker/tusdbtc@miniTicker/btcusdt@miniTicker";

  console.log("binance socket ", state);

  return dispatch => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${SYMBOL_TICKER}`
    );

    ws.onopen = () => {
      console.log("opening");
    };

    ws.onclose = () => {
      console.log("closing");
    };

    ws.onerror = event => {
      console.log(`Error : ${event}`);
    };

    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      const BTC_MARKET = data;

      //console.log(data);

      if (Array.isArray(BTC_MARKET)) {
        for (let i = 0; i < BTC_MARKET.length; i++) {
          const symbol = BTC_MARKET[i];
          if (!symbol || !symbol.s.includes("BTC")) {
            continue;
          }
          //console.log(symbol);

          const id = symbol.s;
          const price = symbol.c;

          const coinAction = {
            type: UPDATE_COIN,
            payload: {
              coin: { id, price }
            }
          };
          dispatch(coinAction);
        }
      } else {
        const id = data.s;
        const price = data.c;

        const coinAction = {
          type: UPDATE_COIN,
          payload: {
            coin: { id, price }
          }
        };
        dispatch(coinAction);
      }
    };
  };
};

const mapStateToProps = (state, props) => {
  console.log(state);
  return {
    coinList: state.coinReducer.coinList
  };
};

export default BinanceSocket;
