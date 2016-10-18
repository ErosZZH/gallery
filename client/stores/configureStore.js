/**
 * Created by rick on 16/9/20.
 */
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const middleware = applyMiddleware(thunkMiddleware);

  let store;

  if (__DEVCLIENT__) {
    store = (window.devToolsExtension ? window.devToolsExtension()(middleware(createStore)) :
      middleware(createStore))(rootReducer, initialState);
  } else {
    store = middleware(createStore)(rootReducer, initialState);
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;

}
