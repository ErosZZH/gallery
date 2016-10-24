/**
 * Created by rick on 2016/10/24.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class ImageEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="img-editor">
        <img src={this.props.url} alt="点击上传图片" />
        <div className="img-text">
          <input type="text" defaultValue={this.props.title} onChange={this.props.changeTitle} />
          <textarea rows="5" defaultValue={this.props.desc} onChange={this.props.changeDesc} />
          <button type="button" onClick={this.props.savetxt} >更新文本</button>
        </div>
      </div>
    );
  }
}

export default connect()(ImageEditor);
