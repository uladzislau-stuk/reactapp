const
	FETCH_WEATHER_FORECAST_UNSENT = 'FETCH_WEATHER_FORECAST_UNSENT',
	FETCH_WEATHER_FORECAST_SUCCESS = 'FETCH_WEATHER_FORECAST_SUCCESS',
	FETCH_WEATHER_FORECAST_ERROR = 'FETCH_WEATHER_FORECAST_ERROR';

const initialState = {
	weather: {
		city: '',
		time: 0,
		currentWeather: null,
		nextWeekWeather: null
	},
	error: ''
};

const weatherForecast = (state = initialState, action = {}) => {
	switch (action.type) {
		case FETCH_WEATHER_FORECAST_UNSENT:
			return {
				...state
			};
		case FETCH_WEATHER_FORECAST_SUCCESS:
			return {
				...state,
				weather: action.data
			};
		case FETCH_WEATHER_FORECAST_ERROR:
			return {
				...state,
				error: 'Error while fetching weather data'
			};
		default:
			return state;
	}
};

export {
	weatherForecast as default,
	FETCH_WEATHER_FORECAST_UNSENT,
	FETCH_WEATHER_FORECAST_SUCCESS,
	FETCH_WEATHER_FORECAST_ERROR
};