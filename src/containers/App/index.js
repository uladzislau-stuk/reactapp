import { connect } from "react-redux";

import './styles/index.scss';
import { WeatherView } from '../../components/views/';

import { fetchWeatherForecast } from '../../core/actions';

const mapStateToProps = (state) => ({
	weather: state.weatherForecast.weather,
	error: state.weatherForecast.error
});

const mapDispatchToProps = (dispatch) => ({
	fetchWeatherForecast: (latlon) => {
		dispatch(fetchWeatherForecast(latlon));
	}
});

const Weather = connect(
	mapStateToProps,
	mapDispatchToProps
)(WeatherView);

export default Weather;