/**
 * Created by rick on 2016/10/13.
 */
import React from 'react';
import {renderToString} from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from 'routes';
import configureStore from 'stores/configureStore';
import {setImage} from 'actions/image';
import header from './meta';

export default function render(req, res) {
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  const routes = createRoutes();

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      new Promise(resolve => {
        //挪到componentWillMount执行
        // return resolve(store.dispatch(setImage()));
      }).then(() => {
        const initialState = store.getState();
        const componentHTML = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
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
      }).catch((err) => {
        console.log('Error happened ' + err.stack);
        res.status(500).json(err);
      });
    } else {
      res.sendStatus(404);
    }
  });



}
