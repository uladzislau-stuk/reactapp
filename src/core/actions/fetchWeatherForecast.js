import moment from 'moment-timezone';
import {
	FETCH_WEATHER_FORECAST_UNSENT,
	FETCH_WEATHER_FORECAST_SUCCESS,
	FETCH_WEATHER_FORECAST_ERROR
} from '../reducers/weatherForecast';

export const fetchWeatherForecast = (latlon) => (dispatch) => {
	const myInit = { mode: 'cors' };

	dispatch(fetchWeatherForecastUnsent());

	return fetch(`https://weatherappre.herokuapp.com/forecast/${latlon}`, myInit)
		.then((res) => res.json())
		.then((res) => {
			const { timezone,
				currently: weather,
				daily: { data : forecast }
			} = res;

			let newForecast = Array.from(forecast).slice(1);

			let time = Number(moment().tz(timezone).format('x'));

			let currentWeather = {};
			( { temperature: currentWeather.temperature,
				icon: currentWeather.icon,
				precipIntensity: currentWeather.precipIntensity,
				windSpeed: currentWeather.windSpeed
			} = weather );

			currentWeather.temperature = Math.round(currentWeather.temperature);
			currentWeather.precipIntensity = Math.round(currentWeather.precipIntensity * 100) / 100;

			let nextWeekWeather = newForecast.map((obj) => {
				let time = moment(obj.time * 1000).format('dddd');
				let { icon, temperatureMax, temperatureMin } = obj;
				temperatureMax = Math.round(temperatureMax);
				temperatureMin = Math.round(temperatureMin);

				return {
					time,
					icon,
					temperatureMax,
					temperatureMin
				};
			});

			dispatch(fetchWeatherForecastSuccess({ time, currentWeather, nextWeekWeather }));
		}).catch(e => {
			dispatch(fetchWeatherForecastError(`ERROR(${e.code}): ${e.message}`));
		});
};

export const fetchWeatherForecastUnsent = () => ({
	type: FETCH_WEATHER_FORECAST_UNSENT
});

export const fetchWeatherForecastSuccess = (data) => ({
	type: FETCH_WEATHER_FORECAST_SUCCESS,
	data
});

export const fetchWeatherForecastError = (error) => ({
	type: FETCH_WEATHER_FORECAST_ERROR,
	error
});