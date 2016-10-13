/**
 * Created by rick on 16/9/24.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

require('./styles.scss');

export class ControllerUnit extends Component {

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
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    let controllerUnitClass = 'controller-unit';
    controllerUnitClass += this.props.arrange.isCenter? ' is-center': '';
    controllerUnitClass += this.props.arrange.isInverse? ' is-inverse': '';

    return (
      <span className={controllerUnitClass} onClick={this.handleClick.bind(this)}></span>
    );
  }
}

export default connect((state) => {return {
  imgsArrangeArr: state.image.imgsArrangeArr
}})(ControllerUnit);
