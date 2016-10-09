/**
 * Created by rick on 16/9/24.
 */
import {
  INVERSE_IMAGE,
  REARRANGE
} from '../types';
import Immutable from 'immutable';

const imgsArrangeArr = [];
const imageDatas = require('../data/imageDatas.json').map((imageData) => {
  imageData.imageURL = require('../images/' + imageData.fileName);
  imgsArrangeArr.push({
    pos: {
      left: 0,
      top: 0
    },
    rotate: 0,
    isInverse: false,
    isCenter: false
  });
  return imageData;
});

const initialState = {
  imageDatas: imageDatas,
  imgsArrangeArr: imgsArrangeArr
};

export default function image(state = initialState, action = {}) {
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
