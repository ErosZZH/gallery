/**
 * Created by rick on 2016/10/19.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class Upload extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>This is upload page.</div>
    );
  }
}

export default connect()(Upload);
