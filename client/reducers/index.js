import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import image from './image';

const rootReducer = combineReducers({
  image,
  routing
});

export default rootReducer;
