/**
 * Created by rick on 16/9/22.
 */
import * as types from '../types';

export function setImage(images) {
  return {type: types.INIT_IMAGE, images};
}
