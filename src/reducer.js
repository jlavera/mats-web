import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import coursesList from './components/courses-list/reducer';
import shared from './shared/reducer';

const reducer = combineReducers({
  routing: routerReducer,
  coursesList,
  shared
});

export default reducer;
