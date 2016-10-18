import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'stores/configureStore';
import Stage from 'containers/stage';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <Stage />
  </Provider>,
  document.getElementById('app')
);