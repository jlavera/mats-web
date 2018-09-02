import 'babel-polyfill';
import React                             from 'react';
import ReactDOM                          from 'react-dom';
import { Provider }                      from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore }          from 'react-router-redux';

import { App }  from './components';
import './index.css';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
