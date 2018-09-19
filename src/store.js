import { createStore, applyMiddleware } from 'redux';
import thunk                            from 'redux-thunk';
import promise                          from 'redux-promise';
import { routerMiddleware }             from 'react-router-redux';
import reducer                          from './reducer';
import { browserHistory }               from 'react-router';


const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    promise,
    routerMiddleware(browserHistory)
  )
);

export default store;
