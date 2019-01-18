import { combineReducers } from 'redux';
import weatherForecast from './weatherForecast';

const rootReducer = combineReducers({
	weatherForecast: weatherForecast
});

export default rootReducer;