export const fetchLocationWeather = (city) => {
	const myInit = {
		mode: 'cors'
	};
	const distance = city['lat_long'];

	return fetch(`https://weatherappre.herokuapp.com/forecast/${distance}`, myInit)
		.then(res => res.json());
};