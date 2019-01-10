import React, { Component } from 'react';
import './styles/index.scss';
import moment from 'moment-timezone';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { WeatherCard } from '../../components/';

// data
import cities from '../../localData/cities';

// actions
import { fetchLocationWeather } from '../../core/actions';

class WeatherApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			city: '',
			time: 0,
			currentWeather: null,
			nextWeekWeather: null,
			expanded: true
		};
	}

	componentWillMount() {
		fetchLocationWeather(cities[0]).then(res => {
			// // get unix time in dependence timezone
			// 	currentTime = Number(moment().tz(weather.timezone).format('x')),
			const city = cities[0].title;
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

			// let currentWeather = (({temperature, icon, precipIntensity, windSpeed}) =>
			// ({temperature, icon, precipIntensity, windSpeed}))(weather);
			currentWeather.temperature = Math.round(currentWeather.temperature);

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

			this.setState({ city, time, currentWeather, nextWeekWeather });
			this.timerId = setInterval(this.timer, 1000);
		});
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	handlerExpandClick = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	timer = () => {
		this.setState({ time: this.state.time + 1000 });
	};

	render() {
		// TODO refactor
		if (!this.state.currentWeather || !this.state.nextWeekWeather) {
			return null;
		}

		let { city, time, currentWeather, nextWeekWeather, expanded } = this.state;

		time = moment(this.state.time).format('dddd, h:mm:ss, A');

		return (
			<MuiThemeProvider>
				<WeatherCard
					city={ city }
					time={ time }
					weather={ currentWeather }
					forecast={ nextWeekWeather }
					expanded={ expanded }
					click={ this.handlerExpandClick }>
				</WeatherCard>
			</MuiThemeProvider>
		);
	}
}



export default WeatherApp;