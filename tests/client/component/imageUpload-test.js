/**
 * Created by rick on 2016/10/28.
 */
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Upload} from '../../../client/containers/upload';
import {ImageEditor} from '../../../client/components/imageEditor';

function setup(imageDatas = []) {
  const props = {
    imageDatas
  };

  const output = TestUtils.renderIntoDocument(
    <Upload {...props} />
  );

  return {
    props,
    output
  };
}

describe('component test', () => {
  describe('test upload component', () => {
    it('should render ImageEditors', () => {
      const optionalProps = [{
        fileName: '1.jpg',
        title: 'xx',
        desc: 'xxx',
        imageURL: 'xxxx'
      }];
      const { output } = setup(optionalProps);
      const imageEditorComponents = TestUtils.scryRenderedComponentsWithType(output, ImageEditor);
      expect(imageEditorComponents.length).toEqual(1);
    });
  });
});
