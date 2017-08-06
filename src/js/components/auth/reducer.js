import { fromJS } from 'immutable';

import {
	AUTH_ERROR,
	AUTH_USER,
	UNAUTH_USER
} from './actions';

export const initialState = fromJS({
	auth: {
		error: 				 '',
		authenticated: false
	}
});

export default function(state = initialState, action) {
	switch (action.type) {
		case AUTH_USER:
			return state
				.set('authenticated', true)
				.set('error', '');
		case UNAUTH_USER:
			return state.set('authenticated', false);
		case AUTH_ERROR:
			return state.set('error', action.payload);
	}

	return state;
}
