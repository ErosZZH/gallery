require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

let imageDatas = require('data/imageDatas.json').map((imageData) => {
  imageData.imageURL = require('../images/' + imageData.fileName);
  return imageData;
});

var Constant = {
  centerPos: {
    left: 0,
    top: 0
  },
  hPosRange: {
    leftSecX: [0, 0],
    rightSecX: [0, 0],
    y: [0, 0]
  },
  vPosRange: {
    x: [0, 0],
    topY: [0, 0]
  }
};


class AppComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      imgsArrangeArr: []
    };
  };

  getRangeRandom(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }

  rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeX = vPosRange.x,
      vPosRangeTopY = vPosRange.topY,

      imgsArrangeTopArr = [],
      topImageNum = Math.floor(Math.random() * 2),

      topImageSpliceIndex = 0,

      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    imgsArrangeCenterArr[0].pos = centerPos;

    topImageSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImageNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImageSpliceIndex, topImageNum);

    var self = this;
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index].pos = {
        top: self.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: self.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      }
    });

    console.log('left: ' + hPosRangeLeftSecX[0] + ":" + hPosRangeLeftSecX[1]);
    console.log('right: ' + hPosRangeRightSecX[0] + ":" + hPosRangeRightSecX[1]);

    for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLORX = null;
      if(i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i].pos = {
        top: self.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: self.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      }
    }

    if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImageSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({imgsArrangeArr});

  };


  componentDidMount() {
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.floor(stageW / 2),
      halfStageH = Math.floor(stageH / 2);

    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.floor(imgW / 2),
      halfImgH = Math.floor(imgH / 2);

    Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    Constant.hPosRange.leftSecX[0] = -halfImgW;
    Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    Constant.hPosRange.y[0] = -halfImgH;
    Constant.hPosRange.y[1] = stageH - halfImgH;

    Constant.vPosRange.topY[0] = -halfImgH;
    Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    Constant.vPosRange.x[0] = halfStageW - imgW;
    Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  };

  render() {
    var controllerUnits = [];
    var imgFigures = [];
    var self = this;
    imageDatas.forEach((value, index) => {
      if(!self.state.imgsArrangeArr[index]) {
        self.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}
        arrange={this.state.imgsArrangeArr[index]}></ImgFigure>);
    });
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

class ImgFigure extends React.Component {

  render() {
    var styleObj = {};
    if(this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    return (
      <figure className="img-figure" style={styleObj}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
