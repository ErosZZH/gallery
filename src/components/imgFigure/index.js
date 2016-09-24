/**
 * Created by rick on 16/9/24.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

require('./styles.scss');

export class ImgFigure extends Component {

  static propTypes = {
    imgsArrangeArr: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  handleClick(e) {
    if(this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  }

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
    return(
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

export default connect((state) => {return {
  imgsArrangeArr: state.image.imgsArrangeArr
}})(ImgFigure);


