import apiGateway from '../../gateways/mats-api';

export const CAREERSLIST_REQUEST = 'CAREERSLIST_REQUEST';
export const CAREERSLIST_SUCCESS = 'CAREERSLIST_SUCCESS';
export const CAREERSLIST_ERROR   = 'CAREERSLIST_ERROR';

const careersListRequest = () => {
  return {
    type: CAREERSLIST_REQUEST
  };
};

const careersListSuccess = (careers) => {
  return {
    type:    CAREERSLIST_SUCCESS,
    payload: {
      careers
    }
  };
};

const careersListError = (error) => {
  return {
    type:    CAREERSLIST_ERROR,
    payload: {
      error
    }
  };
};

export const doGetCareers = () => {
  return function (dispatch) {
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
};

export const SELECT_CAREER = 'SELECT_CAREER';

const selectCareer = (code) => {
  return {
    type:    SELECT_CAREER,
    payload: {
      code
    }
  };
}

export const doSelectCareer = (code) => {
  return function (dispatch) {
    dispatch(selectCareer(code));
  };
}
