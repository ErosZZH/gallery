/**
 * Created by rick on 16/9/24.
 */
import {
  INIT_IMAGE
} from '../types';

export default function image(state = {}, action = {}) {
  switch (action.type) {
    case INIT_IMAGE:
      return {
        ...state,
        ...action.images
      };
    default:
      return state;
  }
}
