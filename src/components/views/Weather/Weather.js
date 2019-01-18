import React, { Component } from 'react';
import style from './styles.scss';

import moment from 'moment-timezone';
import Script from "react-load-script";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Button, Card, CardActions, CardContent, Collapse, Divider } from "@material-ui/core/";

import { CurrentWeather, ForecastList, Search } from '../../ui/';

const language = '&language=en',
	token = 'AIzaSyBKhHBmWIuN8B6Q2BoxWLxwnaR1CbXoQGo',
	googleApiUrl = `https://maps.googleapis.com/maps/api/js?key=${token}${language}&libraries=places`;

class Weather extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: new Date().getTime(),
			visible: false,
			expanded: true
		};

		let { fetchWeatherForecast } = props;
		this._fetchWeatherForecast = fetchWeatherForecast;
	}

	componentWillMount() {
		this.setCurrentLocation();
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	componentDidUpdate(prevProps) {
		// if (this.props.weather.time !== prevProps.weather.time) {
		// 	this.setState( { time: this.props.weather.time } );
		// }
	}

	componentDidMount() {
		this.timerId = setInterval(this.runTimer, 1000);
	}

	formatTime = (milliseconds) => {
		return moment(milliseconds).format('dddd, h:mm:ss, A');
	};

	runTimer = () => {
		this.setState( { time: this.state.time + 1000 } );
	};

	setCurrentLocation = () => {
		if (!navigator.geolocation) {
			console.warn("Geolocation is not supported by this browser.");
		}

		const success = (pos) => {
			let crd = pos.coords,
				latlon = `${crd.latitude},${crd.longitude}`;
			this._fetchWeatherForecast(latlon);
		};
		const error = (e) => {
			console.warn(`ERROR(${e.code}): ${e.message}`);
		};

		navigator.geolocation.getCurrentPosition( success, error );
	};

	handleScriptLoad = () => {
		const google = window.google,
			autoCompleteInit = {
				types: ['(cities)']
			},
			autocompleteField = document.getElementById('autocomplete');

		this.autocomplete = new google.maps.places.Autocomplete(autocompleteField, autoCompleteInit);
		this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
	};

	handlePlaceChanged = () => {
		const place = this.autocomplete.getPlace();

		if (place.length === 0) {
			return;
		}

		const { geometry: { location: { lat, lng }}} = place ; // as lat and lng func
		const latlng = `${lat()},${lng()}`;

		this._fetchWeatherForecast(latlng);
	};

	handleFieldValueChange = (e) => {
		this.setState({ visible: !!e.target.value } );
	};

	handleClearBtnClick = () => {
		const autocompleteField = document.getElementById('autocomplete');
		autocompleteField.value = '';
		this.setState({ visible: false } );
	};

	handleExpandClick = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render() {
		const { weather } = this.props;
		const { city, currentWeather, nextWeekWeather } = weather;

		const { visible, expanded } = this.state;

		if (!weather.city) {
			return null;
		}

		return (
			<MuiThemeProvider>
				<Script url={ googleApiUrl } onLoad={ this.handleScriptLoad }/>
				<div className={ style.container }>
					<Search change={ this.handleFieldValueChange } onClickClearBtn={ this.handleClearBtnClick } visible={ visible }/>
					<Card className={ style.card } raised={ true }>
						<CardContent>
							<CurrentWeather weather={ currentWeather } city={ city } time={ this.formatTime(this.state.time) } />
							<Collapse in={ expanded } timeout='auto' unmountOnExit>
								<ForecastList forecast={ nextWeekWeather } />
							</Collapse>
						</CardContent>
						<Divider />
						<CardActions>
							<Button size='medium' color='primary' onClick={ this.handleExpandClick }>
								{ this.state.expanded ? 'Collapse' : 'Show more' }
							</Button>
						</CardActions>
					</Card>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Weather;