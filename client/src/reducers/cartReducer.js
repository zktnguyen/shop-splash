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
  let update = { total: 0, quantity: 0 };
  let currentCart = [];
  let index = -1;
  switch (action.type) {
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
        cart: [...state.cart, action.payload],
        total: update.total,
        quantity: update.quantity
      };
    case actionTypes.DELETE_CART_ITEM:
      currentCart = [...state.cart];
      index = currentCart.findIndex(item => item._id === action.payload._id);
      if (index >= 0) {
        update = updateState(
          state.total,
          state.quantity,
          currentCart[index].price * -1,
          currentCart[index].quantity * -1
        );
        return {
          cart: [
            ...currentCart.slice(0, index),
            ...currentCart.slice(index + 1)
          ],
          total: update.total,
          quantity: update.quantity
        };
      }
      return {
        cart: currentCart,
        total: state.total,
        quantity: state.quantity
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
        total: !!update.total ? update.total : state.total,
        quantity: !!update.quantity ? update.quantity : state.quantity
      };
    default:
      return state;
  }
}
