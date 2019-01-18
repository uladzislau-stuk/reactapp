import {
	FETCH_LOCATION_ADDRESS_UNSENT,
	FETCH_LOCATION_ADDRESS_SUCCESS,
	FETCH_LOCATION_ADDRESS_ERROR
} from '../reducers/locationAddress';

export const fetchLocationAddress = (latlon) => (dispatch) => {
	const myInit = { mode: 'cors' }, language = '&language=en', token = 'AIzaSyBuVPMxPLIQPEDwyP2BJ9mSosdNIAcJmkI';

	dispatch(fetchLocationAddressUnsent());

	return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlon}&key=${token}${language}`, myInit)
		.then((res) => res.json())
		.then((geoCoding) => {
			const places = geoCoding.results;

			const findLocationName = (places) => {
				if (!places) {
					return null;
				}

				for (let i = 0; i < places.length; i++) {
					let address = places[i].address_components;

					for (let y = 0; y < address.length; y++) {
						let types = address[y].types;

						if (types.includes("locality")) {
							return address[y].long_name;
						}
					}
				}
			};

			dispatch(fetchLocationAddressSuccess(findLocationName(places)));
		}).catch(e => {
			dispatch(fetchLocationAddressError(`ERROR(${e.code}): ${e.message}`));
		});
};

export const fetchLocationAddressUnsent = () => ({
	type: FETCH_LOCATION_ADDRESS_UNSENT
});

export const fetchLocationAddressSuccess = (data) => ({
	type: FETCH_LOCATION_ADDRESS_SUCCESS,
	data
});

export const fetchLocationAddressError = (error) => ({
	type: FETCH_LOCATION_ADDRESS_ERROR,
	error
});