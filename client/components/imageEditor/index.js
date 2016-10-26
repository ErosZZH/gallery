/**
 * Created by rick on 2016/10/24.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Upload from 'rc-upload';

export class ImageEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const uploaderProps = {
      action: `/api/uploadImage?fileName=${this.props.fileName}`,
      multiple: false,
      supportServerRender: true,
      name: 'file',
      component: 'div',
      // beforeUpload(file) {
      //   console.log('beforeUpload', file.name);
      // },
      // onStart: (file) => {
      //   console.log('onStart', file.name);
      //   // this.refs.inner.abort(file);
      // },
      onSuccess(file) {
        console.log('onSuccess', file);
      },
      // onProgress(step, file) {
      //   console.log('onProgress', Math.round(step.percent), file.name);
      // },
      onError(err) {
        console.log('onError', err);
      }
    };
    return (
      <div className="img-editor">
        <Upload {...uploaderProps} >
          <img src={this.props.url} style={{cursor: 'pointer'}} alt="点击上传图片" />
        </Upload>
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
