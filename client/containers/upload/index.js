/**
 * Created by rick on 2016/10/19.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

require('./styles.scss');

export class Upload extends Component {
  static propTypes = {
    imageDatas: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <h1>上传图片</h1>
        <section className="container">
          {
            this.props.imageDatas.map((imageData, index) =>
              <img className="img-editor" key={index} src={imageData.imageURL} />
            )
          }
        </section>
      </section>
    );
  }
}

export default connect(state => {return {imageDatas: state.image.imageDatas}})(Upload);
