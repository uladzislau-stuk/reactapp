import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.scss';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, Collapse, CardContent, Button , Divider } from '@material-ui/core/';
import { CurrentWeather, ForecastList, Search } from '../ui/';

const WeatherCard = (props) => {
	const { weather, time, expanded, click } = props;
	const { city, currentWeather: today, nextWeekWeather: forecast } = weather;

	return (
		<div className={ style.container }>
			<Search />
			<Card className={ style.card } raised={ true }>
				<CardContent>
					<CurrentWeather weather={ today } city={ city } time={ time } />
					<Collapse in={ expanded } timeout='auto' unmountOnExit>
						<ForecastList forecast={ forecast } />
					</Collapse>
				</CardContent>
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

WeatherCard.propTypes = {
	city: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	weather: PropTypes.object,
	forecast: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(style)(WeatherCard);