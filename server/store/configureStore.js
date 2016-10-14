import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middleware = applyMiddleware(thunk);
  return middleware(createStore)(rootReducer, initialState);
}
