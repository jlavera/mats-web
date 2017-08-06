import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import { reducer as form } from "redux-form";
import careersList         from './components/careers-list/reducer';
import coursesList         from './components/courses-list/reducer';
import auth								 from './components/auth/reducer';

const allReducers = combineReducers({
  routing: routerReducer,
	form,
	auth,
  careersList,
  coursesList
});

export default allReducers
