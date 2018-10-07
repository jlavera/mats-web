import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import careersList         from './components/careers-list/reducer';
import coursesList         from './components/courses-list/reducer';
import dropdowns           from './components/courses-list/components/course/components/optative-dropdown/reducer';
import shared              from './shared/reducer';

const reducer = combineReducers({
  routing:     routerReducer,
  careersList,
  coursesList,
  dropdowns,
  shared
});

export default reducer
