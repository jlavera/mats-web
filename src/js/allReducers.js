import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import careersList         from './components/careers-list/reducer';
import coursesList         from './components/courses-list/reducer';

const allReducers = combineReducers({
  routing:     routerReducer,
  careersList,
  coursesList
});

export default allReducers
