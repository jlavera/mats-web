import 'babel-polyfill';
import React                                            from 'react';
import ReactDOM                                         from 'react-dom';
import { Provider }                                     from 'react-redux';
import { createStore, applyMiddleware }                 from 'redux';
import thunk                                            from 'redux-thunk';
import promise                                          from 'redux-promise';
import createLogger                                     from 'redux-logger';
import { Router, Route, browserHistory, IndexRoute }    from 'react-router';
import { syncHistoryWithStore, routerMiddleware } 			from 'react-router-redux';

import allReducers   from './allReducers';
import components    from './components';
import { AUTH_USER } from './components/auth/actions';

require('../css/general.styl');

require('../static/bootstrap/css/bootswatch.min.css');
require('../static/bootstrap/js/bootstrap.min.js');
require('../static/bootstrap/js/jquery-3.2.1.min.js');
require('../static/bootstrap/fonts/glyphicons-halflings-regular.eot');
require('../static/bootstrap/fonts/glyphicons-halflings-regular.svg');
require('../static/bootstrap/fonts/glyphicons-halflings-regular.ttf');
require('../static/bootstrap/fonts/glyphicons-halflings-regular.woff');
require('../static/bootstrap/fonts/glyphicons-halflings-regular.woff2');

const store  = createStore(
	allReducers,
	applyMiddleware(thunk, promise, createLogger(), routerMiddleware(browserHistory))
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const token = localStorage.getItem('token');

if(token) {
	store.dispatch({
		type: AUTH_USER
	});
}

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={components.App}>
				<IndexRoute component={components.Welcome}/>
				<Route path="signin" component={components.Signin}/>
				<Route path="signup" component={components.Signup}/>
				<Route path="signout" component={components.Signout}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
