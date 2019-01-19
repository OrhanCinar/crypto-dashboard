import { connect } from "react-redux";

//Action Types
export const UPDATE_COIN = "UPDATE_COIN";
export const ADD_COIN = "ADD_COIN";
export const UPDATE_K_LINE = "UPDATE_K_LINE";

const BinanceSocket = state => {
  const ALL_MARKET_TICKER = "!miniTicker@arr";
  const SYMBOL_TICKER = "btcusdt@miniTicker";
  const KLINE = "btcusdt@kline_1m";

  console.log("binance socket ", state);

  return dispatch => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${KLINE}`);

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

      if (data.e === "24hrMiniTicker") {
        const coinAction = parseMiniTicker(data);
        dispatch(coinAction);
      } else if (data.e === "kline") {
        const klineData = parseKLine(data);

      
        const klineAction = {
          type: UPDATE_K_LINE,
          payload: {
            kline: { id: data.s, price: klineData }
          }
        };
        dispatch(klineAction);
      }
    };
  };
};

function parseMiniTicker(data) {
  //multiple coins
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const symbol = data[i];
      if (!symbol || !symbol.s.includes("BTC")) {
        continue; // usine only BTC Market
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
      return coinAction;
    }
  }
  //single coin
  else {
    const id = data.s;
    const price = data.c;

    const coinAction = {
      type: UPDATE_COIN,
      payload: {
        coin: { id, price }
      }
    };
    return coinAction;
  }
}

function parseKLine(data) {
  const openPrice = data.k.o;
  const closePrice = data.k.c;
  const symbolName = data.k.s;
  //console.log(symbolName, openPrice, closePrice);
  return closePrice;
}

const mapStateToProps = (state, props) => {
  console.log(state);
  return {
    coinList: state.coinReducer.coinList
  };
};

export default BinanceSocket;
