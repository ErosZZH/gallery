/**
 * Created by rick on 2016/10/19.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {ImageEditor} from 'components/imageEditor';
import {setTitle, setDesc, saveText} from 'actions/image';

require('./styles.scss');

export class Upload extends Component {
  static propTypes = {
    imageDatas: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  changeTitle = index => {
    return function(e) {
      this.props.setTitle(index, e.target.value);
    }.bind(this);
  };

  changeDesc = index => {
    return function(e) {
      this.props.setDesc(index, e.target.value);
    }.bind(this);
  };

  saveText = index => {
    return function() {
      this.props.saveText(this.props.imageDatas[index]);
    }.bind(this);
  };

  render() {
    return (
      <section>
        <h1>上传图片</h1>
        <section className="container">
          {
            this.props.imageDatas.map((imageData, index) =>
              <ImageEditor
                key={index}
                url={imageData.imageURL}
                title={imageData.title}
                desc={imageData.desc}
                fileName={imageData.fileName}
                changeTitle={this.changeTitle(index)}
                changeDesc={this.changeDesc(index)}
                savetxt={this.saveText(index)}
              />
            )
          }
        </section>
        <div className="show-page">
          <a href="/"><img src="/icons/back.png" alt="展示图片"/></a>
        </div>
      </section>
    );
  }
}

export default connect(state => {return {imageDatas: state.image.imageDatas}},
  {setTitle, setDesc, saveText})(Upload);
