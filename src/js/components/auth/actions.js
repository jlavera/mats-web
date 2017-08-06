import { browserHistory } from 'react-router';
import apiGateway from '../../gateways/mats-api';

export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';

export function signup({ username, password }) {
	return function(dispatch) {
		apiGateway.signup({ username, password })
			.then(response => {
				localStorage.setItem('token', response.bearer);
				dispatch({ type: AUTH_USER });
				browserHistory.push('/')
			})
			.catch(response => {
				const { message, status } = response;
				status >= 500
					? dispatch(authError('There was an error creating your account. Please try again later...'))
					: dispatch(authError(message));
			});
	}
}

export function signin({ username, password }) {
	return function(dispatch) {
		apiGateway.signin({ username, password })
			.then(response => {
				localStorage.setItem('token', response.bearer);
				dispatch({ type: AUTH_USER });
				browserHistory.push('/')
			})
			.catch(response => {
				const { message, status } = response;
				status >= 500
					? dispatch(authError('There was an error trying to sign you up. Please try again later...'))
					: dispatch(authError(message));
			});
	}
}

export function signout() {
	localStorage.removeItem('token');
	return {
		type: UNAUTH_USER
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}
