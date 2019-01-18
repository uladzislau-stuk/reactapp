import { connect } from "react-redux";

import './styles/index.scss';
import { WeatherView } from '../../components/views/';

import { fetchWeatherForecast, fetchLocationAddress } from '../../core/actions';

const mapStateToProps = (state) => ({
	locationName: state.locationAddress.locationName,
	weather: state.weatherForecast.weather,
	error: state.weatherForecast.error
});

const mapDispatchToProps = (dispatch) => ({
	fetchWeatherForecast: (latlon) => {
		dispatch(fetchWeatherForecast(latlon));
	},
	fetchLocationAddress: (latlon) => {
		dispatch(fetchLocationAddress(latlon));
	}
});

const Weather = connect(
	mapStateToProps,
	mapDispatchToProps
)(WeatherView);

export default Weather;