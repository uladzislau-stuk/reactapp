import React from 'react';
import style from './styles.scss';
import { Typography } from '@material-ui/core/';
import { Img } from '../';

const ForecastList = (props) => {
	const { forecast } = props;
	const forecastList = forecast.map((forecastItem, index) => {
		let { time, icon, temperatureMax, temperatureMin } = forecastItem;

		return (
			<div key={ index + 1 }>
				<Typography component='span' variant='body1'>{ time }</Typography>
				<Img icon={ icon } dimensions='20px'/>
				<Typography component='span' variant='body1'>{ temperatureMax }°
					<Typography component='span' variant='body1'>/{ temperatureMin }°</Typography>
				</Typography>
			</div>
		);
	});

	return (
		<div className={ style.forecast }>
			{forecastList}
		</div>
	);
};

export default ForecastList;