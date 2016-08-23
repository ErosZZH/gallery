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
  };

  get30DegRandom() {
    return (Math.random() < 0.5? '': '-') + Math.floor(Math.random() * 30);
  };

  /**
   * 翻转
   * @param index
   * @returns {function(this:AppComponent)}
     */
  inverse(index) {
    return function () {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({imgsArrangeArr});
    }.bind(this);
  }

  /**
   * 点击居中
   * @param index
   * @returns {function(this:AppComponent)}
     */
  center(index) {
    return function () {
      this.rearrange(index);
    }.bind(this);
  }

  /**
   * 重新排布图片
   * @param centerIndex
     */
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

    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isInverse: false,
      isCenter: true
    };

    topImageSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImageNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImageSpliceIndex, topImageNum);

    var self = this;
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: self.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: self.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: self.get30DegRandom(),
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
          top: self.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: self.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: self.get30DegRandom(),
        isInverse: false,
        isCenter: false
      };
    }

    if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImageSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({imgsArrangeArr});

  };


  /**
   * 计算img-sec取值范围
   */
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
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index}
        arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
        center={this.center(index)}></ImgFigure>);
      controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
                                           inverse={this.inverse(index)}
                                           center={this.center(index)}/>);
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

  handleClick(e) {
    if(this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    var styleObj = {};
    if(this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    if(this.props.arrange.rotate) {
      let rotate = this.props.arrange.rotate;
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((value) => {
        styleObj[value] = 'rotate(' + rotate + 'deg)';
      });
    }
    if(this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }
    var imgFigureClass = 'img-figure';
    imgFigureClass += this.props.arrange.isInverse? ' is-inverse': '';
    return (
      <figure className={imgFigureClass} style={styleObj} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick.bind(this)}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

class ControllerUnit extends React.Component {

  handleClick(e) {
    if(this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    let controllerUnitClass = 'controller-unit';
    controllerUnitClass += this.props.arrange.isCenter? ' is-center': '';
    controllerUnitClass += this.props.arrange.isInverse? ' is-inverse': '';

    return (
      <span className={controllerUnitClass} onClick={this.handleClick.bind(this)}></span>
    );
  }

}

AppComponent.defaultProps = {
};

export default AppComponent;
