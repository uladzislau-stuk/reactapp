const
	FETCH_LOCATION_ADDRESS_UNSENT = 'FETCH_LOCATION_ADDRESS_UNSENT',
	FETCH_LOCATION_ADDRESS_SUCCESS = 'FETCH_LOCATION_ADDRESS_SUCCESS',
	FETCH_LOCATION_ADDRESS_ERROR = 'FETCH_LOCATION_ADDRESS_ERROR';

const initialState = {
	locationName: ''
};

const locationAddress = (state = initialState, action = {}) => {
	switch (action.type) {
		case FETCH_LOCATION_ADDRESS_UNSENT:
			return {
				...state
			};
		case FETCH_LOCATION_ADDRESS_SUCCESS:
			return {
				...state,
				locationName: action.data
			};
		case FETCH_LOCATION_ADDRESS_ERROR:
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
};

export {
	locationAddress as default,
	FETCH_LOCATION_ADDRESS_UNSENT,
	FETCH_LOCATION_ADDRESS_SUCCESS,
	FETCH_LOCATION_ADDRESS_ERROR
};