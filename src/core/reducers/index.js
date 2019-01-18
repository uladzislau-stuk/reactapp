import { combineReducers } from 'redux';
import weatherForecast from './weatherForecast';
import locationAddress from './locationAddress';

const rootReducer = combineReducers({
	weatherForecast: weatherForecast,
	locationAddress: locationAddress
});

export default rootReducer;