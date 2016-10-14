/**
 * Created by rick on 16/9/24.
 */
import {
  INVERSE_IMAGE,
  REARRANGE
} from '../types';
import Immutable from 'immutable';

export default function image(state = {}, action = {}) {
  const newState = Immutable.fromJS(state);
  switch (action.type) {
    case INVERSE_IMAGE:
      return newState.updateIn(['imgsArrangeArr', action.index, 'isInverse'], isInverse => !isInverse).toJS();
    case REARRANGE:
      return newState.set('imgsArrangeArr', action.imgsArrangeArr).toJS();
    default:
      return state;
  }
}
