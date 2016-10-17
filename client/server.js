/**
 * Created by rick on 2016/10/13.
 */
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import configureStore from 'stores/configureStore';
import {setImage} from 'actions/image';
import Stage from 'containers/stage';

export default function render(req, res) {
  const store = configureStore();

  new Promise(resolve => {
    return resolve(store.dispatch(setImage()));
  }).then(() => {
    const initialState = store.getState();
    const componentHTML = renderToString(
      <Provider store={store}>
        <Stage />
      </Provider>
    );

    return res.status(200).send(`
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
  });

}
