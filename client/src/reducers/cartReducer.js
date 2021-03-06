import { actionTypes } from '../actions/cart';

const updateState = (currentTotal, currentQuantity, price, quantity) => ({
  total: currentTotal + price * Math.abs(quantity),
  quantity: currentQuantity + quantity
});

const getTotal = cart => {
  let total = 0;
  let quantity = 0;
  if (cart.length >= 1) {
    total = cart
      .map(item => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
    quantity = cart.map(item => item.quantity).reduce((a, b) => a + b, 0);
  } else {
    total = cart.price ? cart.price : 0;
    quantity = cart.quantity ? cart.quantity : 0;
  }
  return {
    total,
    quantity
  };
};

export default function(state = { cart: [], total: 0, quantity: 0 }, action) {
  let update = { total: -1, quantity: -1 };
  switch (action.type) {
    case actionTypes.EMPTY_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
        quantity: action.payload.qty
      };
    case actionTypes.GET_CART:
      update = getTotal(action.payload);
      return {
        ...state,
        cart: action.payload,
        total: update.total,
        quantity: update.quantity
      };
    case actionTypes.ADD_TO_CART:
      update = updateState(
        state.total,
        state.quantity,
        action.payload.price,
        1
      );
      return {
        cart: action.payload.cart,
        total: update.total,
        quantity: update.quantity
      };
    case actionTypes.DELETE_CART_ITEM:
      if (!!action.payload.qty) {
        update = updateState(
          state.total,
          state.quantity,
          action.payload.price * -1,
          action.payload.qty * -1
        );
      }
      return {
        cart: action.payload.cart,
        total: update.total !== -1 ? update.total : state.total,
        quantity: update.quantity !== -1 ? update.quantity : state.quantity
      };
    case actionTypes.UPDATE_CART:
      if (!!action.payload.qty) {
        update = updateState(
          state.total,
          state.quantity,
          action.payload.price * action.payload.qty,
          action.payload.qty
        );
      }
      return {
        cart: action.payload.cart,
        total: update.total !== -1 ? update.total : state.total,
        quantity: update.quantity !== -1 ? update.quantity : state.quantity
      };
    default:
      return state;
  }
}
