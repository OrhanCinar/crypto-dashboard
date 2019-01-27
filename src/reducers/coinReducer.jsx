import { UPDATE_COIN, UPDATE_K_LINE, ADD_K_LINE } from "../actions";

const initialState = {
  coinList: []
};

const coinReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case ADD_COIN:
    //   console.log(payload.coin);
    //   return {
    //     ...state,
    //     coinList: [...state.coinList, payload.coin],
    //     action: type
    //   };
    case ADD_K_LINE:
      return {
        ...state,
        candleStickData: payload.candleStickData
      };
    case UPDATE_K_LINE:
      // const { price } = payload.kline;
      // console.log(payload.kline);

      const oldBtcDataSet = state.lineChartData.datasets[0];
      const newBtcDataSet = { ...oldBtcDataSet };
      newBtcDataSet.data.push(parseFloat(payload.kline.price));

      const newChartData = {
        ...state.lineChartData,
        datasets: [newBtcDataSet],
        labels: state.lineChartData.labels.concat(
          Math.round(new Date().getTime() / 1000)
        )
      };

      //console.log('UPDATE_K_LINE', payload.kline.price);
      //console.log(Math.round(new Date().getTime() / 1000));
      return {
        ...state,
        lineChartData: { ...state.lineChartData, newChartData }
      };

    case UPDATE_COIN:
      const { id, price } = payload.coin;

      if (state.coinList.length < 135) {
        let coinExists = state.coinList.find(c => c.id === id);

        if (!coinExists) {
          //console.log(id, 'coinExists');
          return {
            ...state,
            coinList: [...state.coinList, payload.coin]
            //action: type
          };
        }
      }
      return {
        ...state,
        coinList: state.coinList.map(c =>
          c.id === id ? { ...c, price: price } : c
        )
        //action: type
      };
    default:
      return state;
  }
};

export default coinReducer;
