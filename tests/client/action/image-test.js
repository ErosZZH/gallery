/**
 * Created by rick on 2016/10/28.
 */
import * as actions from '../../../client/actions/image';
import * as types from '../../../client/types';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {polyfill} from 'es6-promise';
import expect from 'expect';
import axios from 'axios';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Image Actions Test', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Will reset title correctly', (done) => {
    const index = 0;
    const value = '美景';
    const expectedAction = [
      {
        type: types.SET_TITLE,
        title: {
          index: 0,
          value: '美景'
        }
      }
    ];
    const store = mockStore();
    store.dispatch(actions.setTitle(index, value));
    expect(store.getActions()).toMatch(expectedAction);
    done();
  });

  it('Will save text', (done) => {
    const response = {status: 200, data: 'OK'};
    const image = {fileName: '1.jpg', 'title': 'xx', 'desc': 'xxx'};
    const expectedAction = [
      {
        type: types.SAVE_TEXT
      }
    ];
    sandbox.stub(axios, 'post').returns(Promise.resolve(response));
    const store = mockStore();
    store.dispatch(actions.saveText(image))
      .then(() => {
        expect(store.getActions()).toMatch(expectedAction);
      })
      .then(done)
      .catch(done);
  });

});

