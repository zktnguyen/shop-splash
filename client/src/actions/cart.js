import api from '../api';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const UPDATE_CART = 'UPDATE_CART_ITEM';
const GET_CART = 'GET_CART';

export const getCart = () => dispatch =>
  api.cart.get().then(cart => {
    let savedCart = [];
    if (Array.isArray(cart)) {
      savedCart = cart;
    } else {
      savedCart = [].concat([cart]);
    }
    const action = {
      type: GET_CART,
      payload: savedCart
    };
    dispatch(action);
  });

export const addToCart = item => dispatch =>
  api.cart.post(item).then(cart => {
    const action = {
      type: ADD_TO_CART,
      payload: cart
    };
    dispatch(action);
  });

export const deleteCartItem = item => dispatch =>
  api.cart.post(item).then(cart => {
    const action = {
      type: DELETE_CART_ITEM,
      payload: cart
    };
    dispatch(action);
  });

export const updateCartItem = (_id, unit, cart) => dispatch => {
  const index = cart.findIndex(item => item._id === _id);
  if (index >= 0 && cart[index].quantity >= 1 && unit === 1) {
    const updatedItem = {
      ...cart[index],
      quantity: cart[index].quantity + unit
    };
    const cartUpdate = [
      ...cart.slice(0, index),
      updatedItem,
      ...cart.slice(index + 1)
    ];
    api.cart.post(cartUpdate).then(updatedCart => {
      const action = {
        type: UPDATE_CART,
        payload: {
          cart: updatedCart,
          qty: unit,
          price: updatedItem.price
        }
      };
      dispatch(action);
    });
  }

  const action = {
    type: UPDATE_CART,
    payload: {
      cart,
      qty: 0,
      price: 0
    }
  };
  dispatch(action);
};

export const actionTypes = {
  GET_CART,
  ADD_TO_CART,
  DELETE_CART_ITEM,
  UPDATE_CART
};
