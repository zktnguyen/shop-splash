import { combineReducers } from 'redux';

// Import reducers to be combined

import booksReducers from './booksReducer';
import cartReducers from './cartReducer';

export default combineReducers({
  books: booksReducers,
  cart: cartReducers
});
