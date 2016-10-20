/**
 * Created by rick on 2016/10/19.
 */
import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import Stage from 'containers/stage';
import Upload from 'containers/upload';

export default () => {
  return (
    <Route path="/">
      <IndexRoute component={Stage} />
      <Route path="upload" component={Upload} />
      <Redirect from='*' to='/' />
    </Route>
  );
}
