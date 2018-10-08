import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import careersList         from './components/careers-list/reducer';
import coursesList         from './components/courses-list/reducer';
import shared              from './shared/reducer';

const reducer = combineReducers({
  routing:     routerReducer,
  careersList,
  coursesList,
  shared
});

export default reducer
