import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk'; // eslint-disable-next-line
import logger from 'redux-logger';

import './index.css';
import App from './App';
import Reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(Reducers, middleware);

render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
