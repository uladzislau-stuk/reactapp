import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.scss';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
// import {Card, CardTitle, CardActions} from 'material-ui';
// import FlatButton from 'material-ui/FlatButton';
// import Divider from 'material-ui/Divider';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import CardActions from '@material-ui/core/CardActions';

import { WeatherImg } from '../';

const div = <div>Hello world!!!</div>;

const WeatherCard = (props) => {
	const { city, time, weather, forecast, expanded, click } = props;
	const { temperature, icon, precipIntensity: precipitation, windSpeed } = weather;

	const forecastList = forecast.map((forecast, index) => {
		let { time, icon, temperatureMax, temperatureMin } = forecast;

		return (
			<div key={ index + 1 }>
				<Typography component='span' variant='body1'>{ time }</Typography>
				<WeatherImg icon={ icon } dimensions='20px'/>
				<Typography component='span' variant='body1'>{ temperatureMax }°
					<Typography component='span' variant='body1'>/{ temperatureMin }°</Typography>
				</Typography>
			</div>
		);
	});

	return (
		<div className={ style.container }>
			<Paper className={ style.search } elevation={4}>
				<InputBase className={ style.searchField } placeholder="Search city" />
				<IconButton>
					<i className="material-icons">search</i>
				</IconButton>
			</Paper>
			<Card className={ style.card } raised={ true }>
				<CardContent>
					<div className={ style.city }>
						<Typography component='h1' variant='h5'>{ city }</Typography>
						<Typography component='p' variant='subtitle1'>{ time }</Typography>
					</div>
					<div className={ style.weather }>
						<div className={ style.temperature }>
							<Typography component='span' variant='h1'>
								{ temperature }
								<Typography className={ style.celsius } component='span' variant='h3'>°C</Typography>
							</Typography>
							<WeatherImg icon={ icon } dimensions='90px'/>
						</div>
						<div>
							<div className={ style.precipitation }>
								<WeatherImg icon='precipitation' dimensions='20px'/>
								<Typography component='span' variant='body1'>{ precipitation }% Precipitation</Typography>
							</div>
							<div className={ style.winds }>
								<WeatherImg icon='winds' dimensions='20px'/>
								<Typography component='span' variant='body1'>{ windSpeed } km/h Winds</Typography>
							</div>
						</div>
					</div>
					<Collapse in={ expanded } timeout='auto' unmountOnExit>
						<div className={ style.forecast }>
							{ forecastList }
						</div>
					</Collapse>
				</CardContent >
				<Divider />
				<CardActions>
					<Button size='medium' color='primary' onClick={ click }>
						{ expanded ? 'Collapse' : 'Show more' }
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};

// WeatherCard.propTypes = {
// 	city: PropTypes.string.isRequired,
// 	date: PropTypes.object,
// 	icon: PropTypes.string.isRequired,
// 	temperature: PropTypes.number,
// 	precipitation: PropTypes.number,
// 	windSpeed: PropTypes.number
// };

WeatherCard.propTypes = {
	city: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	weather: PropTypes.object,
	forecast: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(style)(WeatherCard);