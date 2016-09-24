/**
 * Created by rick on 16/9/24.
 */
import {
  INVERSE_IMAGE,
  REARRANGE
} from '../types';

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
  switch (action.type) {
    case INVERSE_IMAGE:
      const arrange = state.imgsArrangeArr[action.index];
      const before = state.imgsArrangeArr.slice(0, action.index);
      const after = state.imgsArrangeArr.slice(action.index + 1);
      return {
        ...state,
        imgsArrangeArr: [
          ...before,
          {
            ...arrange,
            isInverse: !arrange.isInverse
          },
          ...after
        ]
      };
    case REARRANGE:
      return {
        ...state,
        imgsArrangeArr: [...action.imgsArrangeArr]
      };
    default:
      return state;
  }
}
