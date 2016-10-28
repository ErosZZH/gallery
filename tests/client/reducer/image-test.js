/**
 * Created by rick on 2016/10/28.
 */
import expect from 'expect';
import reducer from '../../../client/reducers/image';
import * as types from '../../../client/types';

describe('Image reducer', () => {

  const initState = {
    imageDatas: [
      {
        fileName: '1.jpg',
        title: 'Hello',
        desc: 'xxxxx'
      }
    ]
  };

  it('should SET_TITLE', () => {
    const expectState = {
      imageDatas: [
        {
          fileName: '1.jpg',
          title: 'Hi',
          desc: 'xxxxx'
        }
      ]
    };
    expect(
      reducer(initState, {type: types.SET_TITLE, title: {index: 0, value: 'Hi'}})
    ).toEqual(expectState);
  });

});
