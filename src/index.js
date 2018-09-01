import 'babel-polyfill';
import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import { Provider }                               from 'react-redux';
import { createStore, applyMiddleware }           from 'redux';
import thunk                                      from 'redux-thunk';
import promise                                    from 'redux-promise';
import { createLogger }                           from 'redux-logger';
import { Router, Route, browserHistory }          from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import allReducers from './js/allReducers';
import components  from './js/components';

require('./css/general.css');

// require('./static/css/lux.min.css');
require('./static/css/fonts.css');
require('./static/fonts/glyphicons-halflings-regular.eot');
require('./static/fonts/glyphicons-halflings-regular.svg');
require('./static/fonts/glyphicons-halflings-regular.ttf');
require('./static/fonts/glyphicons-halflings-regular.woff');
require('./static/fonts/glyphicons-halflings-regular.woff2');

const store  = createStore(
    allReducers,
    applyMiddleware(thunk, promise, createLogger(), routerMiddleware(browserHistory))
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={components.Welcome} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
