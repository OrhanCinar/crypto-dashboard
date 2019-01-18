import { UPDATE_COIN, ADD_COIN } from "../actions";

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
    case UPDATE_COIN:
      const { id, price } = payload.coin;

      if (state.coinList.length < 135) {
        let coinExists = state.coinList.find(c => c.id === id);

        if (!coinExists) {
          //console.log(id, 'coinExists');
          return {
            ...state,
            coinList: [...state.coinList, payload.coin],
            //action: type
          };
        }
      }
      return {
        ...state,
        coinList: state.coinList.map(c =>
          c.id === id ? { ...c, price: price } : c
        ),
        //action: type
      };
    default:
      return state;
  }
};

export default coinReducer;
