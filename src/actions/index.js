//Action Types
export const UPDATE_COIN = "UPDATE_COIN";
export const ADD_COIN = "ADD_COIN";

// export const addCoin = coin => ({
//   type: ADD_COIN,
//   coin: coin
// });

// export const updateCoin = coin => ({
//   type: UPDATE_COIN,
//   coin: coin
// });

export function binanceSocket() {
  return dispatch => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/ethbtc@miniTicker/xlmbtc@miniTicker/tusdbtc@miniTicker/btcusdt@miniTicker"
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
      const coinName = data.s;
      const price = data.c;

      // console.log("binanceSocket" + coinName);

      const coinAction = {
        type: UPDATE_COIN,
        payload: {
          coin: { id: coinName, price }
        }
      };
      dispatch(coinAction);
      //dispatch(updateCoin(coins[0]));
    };
  };
}
