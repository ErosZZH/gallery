/**
 * Created by rick on 16/9/22.
 */
import * as types from '../types';
import request from 'axios';
import config from '../../config';

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

export function setImage() {
  return dispatch => {
    let url = '';
    if(__DEVCLIENT__) {
      url = '/api/fetch';
    } else {
      url = `http://localhost:${config.port}/api/fetch`;
    }
    return request.get(url)
      .then(response => {
        const imgsArrangeArr = [];
        const imageDatas = response.data.map((imageData) => {
          imageData.imageURL = 'images/' + imageData.fileName;
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
        return {
          imageDatas: imageDatas,
          imgsArrangeArr: imgsArrangeArr
        };
      })
      .then(images => {
        dispatch({type: types.INIT_IMAGE, images});
      })
      .catch(err => {
        console.log('SSR render error' + err.stack);
      });
  }
}

export function setTitle(index, value) {
  return {type: types.SET_TITLE, title: {index, value}};
}

export function setDesc(index, value) {
  return {type: types.SET_DESC, desc: {index, value}};
}

export function saveText(image) {
  return dispatch => {
    request['post']('/api/updateText', image)
      .then(() => {
         dispatch({type: types.SAVE_TEXT});
      });
  }
}

export function refreshImage(index, url) {
  const randomUrl = `${url}?${Math.floor(Math.random() * 999999)}`;
  return {type: types.REFRESH_IMAGE, index, randomUrl};
}

