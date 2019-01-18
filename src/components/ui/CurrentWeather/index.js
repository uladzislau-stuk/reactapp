import React from 'react';
import style from './styles.scss';
import { Typography } from '@material-ui/core/';
import { Img } from '../';

const CurrentWeather = (props) => {
	const { weather, city , time } = props;
	const { temperature, icon, precipIntensity: precipitation, windSpeed } = weather;

	return (
		<div>
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
					<Img icon={ icon } dimensions='90px'/>
				</div>
				<div>
					<div className={ style.precipitation }>
						<Img icon='precipitation' dimensions='20px'/>
						<Typography component='span' variant='body1'>{ precipitation }% Precipitation</Typography>
					</div>
					<div className={ style.winds }>
						<Img icon='winds' dimensions='20px'/>
						<Typography component='span' variant='body1'>{ windSpeed } km/h Winds</Typography>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;