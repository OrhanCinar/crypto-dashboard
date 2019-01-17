import { UPDATE_COIN, ADD_COIN } from "../actions";

const initialState = {
  coinList: []
};

const coinReducer = (state = initialState, { type, payload }) => { 
  switch (type) {
    case ADD_COIN:
      console.log("ADD_COIN");
      return {
        ...state,
        coinList: [...state.coinList, payload.coin],
        action: type
      };
    case UPDATE_COIN:
      //console.log("UPDATE_COIN");
      const { id, price } = payload.coin;
      return {
        ...state,

        coinList: state.coinList.map(c =>
          c.id === id ? { ...c, price: price } : c
        ),
        action: type
      };
    default:
      console.log("DEFAULT");
      return state;
  }
};

export default coinReducer;
