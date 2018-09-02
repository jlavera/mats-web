import {
  CAREERSLIST_REQUEST,
  CAREERSLIST_SUCCESS,
  CAREERSLIST_ERROR,
} from '../actions';

const initialState = {
  list:       [],
  isFetching: false,
  error:      '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CAREERSLIST_REQUEST:
      return { ...state, isFetching: true, error: '', list: [] };
    case CAREERSLIST_SUCCESS:
      return { ...state, isFetching: false, list: action.payload.careers };
    case CAREERSLIST_ERROR:
      return { ...state, isFetching: false, list: action.payload.error };
    default:
      return state;
  }
}
