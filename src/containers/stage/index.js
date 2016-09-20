/**
 * Created by rick on 16/9/20.
 */
import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

require('normalize.css/normalize.css');
require('./styles/stage.scss');


const metaData = {
  title: '我的相册',
  description: '我的react相册',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags'
    }
  }
};

export default class Stage extends Component {

  render() {
    return (
      <section className="stage" ref="stage">
        <DocumentMeta {...metaData} />
        <section className="img-sec">
          图片区
        </section>
        <nav className="controller-nav">
          控制按钮区
        </nav>
      </section>
    );
  }
}
