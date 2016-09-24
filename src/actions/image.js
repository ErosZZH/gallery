/**
 * Created by rick on 16/9/22.
 */
import * as types from '../types';

export function inverse(index) {
  return {type: types.INVERSE_IMAGE, index};
}

function getRangeRandom(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function get30DegRandom() {
  return (Math.random() < 0.5? '': '-') + Math.floor(Math.random() * 30);
}

export function rearrange(centerIndex, imgsArrangeArr, stage) {
  let centerPos = stage.centerPos,
    hPosRange = stage.hPosRange,
    vPosRange = stage.vPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeX = vPosRange.x,
    vPosRangeTopY = vPosRange.topY,

    imgsArrangeTopArr = [],
    topImageNum = Math.floor(Math.random() * 2),

    topImageSpliceIndex = 0,

    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

  imgsArrangeCenterArr[0] = {
    pos: centerPos,
    rotate: 0,
    isInverse: false,
    isCenter: true
  };

  topImageSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImageNum));
  imgsArrangeTopArr = imgsArrangeArr.splice(topImageSpliceIndex, topImageNum);
  imgsArrangeTopArr.forEach((value, index) => {
    imgsArrangeTopArr[index] = {
      pos: {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      },
      rotate: get30DegRandom(),
      isInverse: false,
      isCenter: false
    };
  });

  for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
    var hPosRangeLORX = null;
    if(i < k) {
      hPosRangeLORX = hPosRangeLeftSecX;
    } else {
      hPosRangeLORX = hPosRangeRightSecX;
    }
    imgsArrangeArr[i] = {
      pos: {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      },
      rotate: get30DegRandom(),
      isInverse: false,
      isCenter: false
    };
  }

  if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
    imgsArrangeArr.splice(topImageSpliceIndex, 0, imgsArrangeTopArr[0]);
  }

  imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

  return {type: types.REARRANGE, imgsArrangeArr};
}

