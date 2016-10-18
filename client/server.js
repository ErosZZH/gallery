/**
 * Created by rick on 2016/10/13.
 */
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import configureStore from 'stores/configureStore';
import {setImage} from 'actions/image';
import Stage from 'containers/stage';
import header from './meta';

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
            ${header.title.toString()}
            ${header.meta.toString()}
            ${header.link.toString()}
          </head>
          <body>
            <div id="app" class="content">${componentHTML}</div>
            <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
            <script type="text/javascript" src="/assets/app.js"></script>
          </body>
          </html>
        `);
  });

}
