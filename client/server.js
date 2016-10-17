/**
 * Created by rick on 2016/10/13.
 */
import React from 'react';
import request from 'axios';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import configureStore from 'stores/configureStore';
import {setImage} from 'actions/image';
import Stage from 'containers/stage';
import config from '../config';

export default function render(req, res) {
  const store = configureStore();

  request.get(`http://localhost:${config.port}/api/fetch`)
    .then(response => {
      const imgsArrangeArr = [];
      const imageDatas = response.data.map((imageData) => {
        imageData.imageURL = 'images/' + imageData.fileName;
        imgsArrangeArr.push({
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        });
        return imageData;
      });
      return {
        imageDatas: imageDatas,
        imgsArrangeArr: imgsArrangeArr
      };
    })
    .then(images => {
      store.dispatch(setImage(images));
      const initialState = store.getState();
      const componentHTML = renderToString(
        <Provider store={store}>
          <Stage />
        </Provider>
      );

      res.status(200).send(`
          <!doctype html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>React Webpack Template Title</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          </head>
          <body>
            <div id="app" class="content">${componentHTML}</div>
            <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
            <script type="text/javascript" src="./assets/app.js"></script>
          </body>
          </html>
        `);
    })
    .catch(err => {
      console.log('SSR render error' + err.stack);
    });

}
