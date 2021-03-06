import React from 'react';

const Img = (props) => {
	let logo = require(`./img/weather/${props.icon}.svg`);

	return <img alt={props.icon} src={logo} width={props.dimensions} height={props.dimensions}/>;
};

export default Img;
