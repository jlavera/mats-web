import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';
import { browserHistory } from 'react-router';

const composeEnhancers =
  process.env.NODE_ENV !== 'AWS' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk, promise, routerMiddleware(browserHistory))
  )
);

export default store;
