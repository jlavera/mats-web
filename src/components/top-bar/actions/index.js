import * as apiGateway from '../../../gateways/mats-api';

export const CAREERSLIST_REQUEST = 'CAREERSLIST_REQUEST';
export const CAREERSLIST_SUCCESS = 'CAREERSLIST_SUCCESS';
export const CAREERSLIST_ERROR   = 'CAREERSLIST_ERROR';

const careersListRequest = () => ({
  type: CAREERSLIST_REQUEST
});

const careersListSuccess = careers => ({
  type: CAREERSLIST_SUCCESS,
  payload: { careers }
});

const careersListError = error => ({
  type: CAREERSLIST_ERROR,
  payload: { error }
});

export const doGetCareers = () => dispatch => {
  dispatch(careersListRequest());

  return apiGateway.getCareers()
    .then(response => {
      dispatch(careersListSuccess(response));
    })
    .catch(error => {
      dispatch(careersListError(error.message));
    })
  ;
}
