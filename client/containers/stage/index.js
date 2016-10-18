/**
 * Created by rick on 16/9/20.
 */
import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { inverse, rearrange } from 'actions/image';
import { ImgFigure } from 'components/imgFigure';
import { ControllerUnit } from 'components/controllerUnit';

require('normalize.css/normalize.css');
require('./styles/stage.scss');


const metaData = {
  title: '我的相册',
  description: '我的react相册',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,redux,html,tags'
    }
  }
};

export class Stage extends Component {

  static propTypes = {
    imgsArrangeArr: PropTypes.array,
    imageDatas: PropTypes.array,
    stage: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      stage: {}
    }
  }

  init(size) {
    const {stageW, stageH, imgW, imgH} = size;

    const stage = {
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

    const halfStageW = Math.floor(stageW / 2);
    const halfStageH = Math.floor(stageH / 2);
    const halfImgW = Math.floor(imgW / 2);
    const halfImgH = Math.floor(imgH / 2);

    stage.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    stage.hPosRange.leftSecX[0] = -halfImgW;
    stage.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    stage.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    stage.hPosRange.rightSecX[1] = stageW - halfImgW;
    stage.hPosRange.y[0] = -halfImgH;
    stage.hPosRange.y[1] = stageH - halfImgH;

    stage.vPosRange.topY[0] = -halfImgH;
    stage.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    stage.vPosRange.x[0] = halfStageW - imgW;
    stage.vPosRange.x[1] = halfStageW;

    return stage;
  }

  componentDidMount() {
    const stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight;

    const imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight;

    const stage = this.init({
      stageW,
      stageH,
      imgW,
      imgH
    });

    this.setState({stage});

    this.props.rearrange(0, this.props.imgsArrangeArr, stage);
  }


  inverse(index) {
    return function () {
      this.props.inverse(index);
    }.bind(this);
  }

  center(index) {
    return function () {
      this.props.rearrange(index, this.props.imgsArrangeArr, this.state.stage);
    }.bind(this);
  }

  render() {
    var controllerUnits = [];
    var imgFigures = [];
    this.props.imageDatas.forEach((value, index) => {
      imgFigures.push(<ImgFigure key={index} data={value}
                                 ref={'imgFigure' + index}
                                 arrange={this.props.imgsArrangeArr[index]}
                                 inverse={this.inverse(index)}
                                 center={this.center(index)}
      />);
      controllerUnits.push(<ControllerUnit key={index}
                                           arrange={this.props.imgsArrangeArr[index]}
                                           inverse={this.inverse(index)}
                                           center={this.center(index)}
      />);
    });
    return (
      <section className="stage" ref="stage">
        <DocumentMeta {...metaData} />
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

export default connect((state) => {return {
  imgsArrangeArr: state.image.imgsArrangeArr,
  imageDatas: state.image.imageDatas
}}, {inverse, rearrange})(Stage);
