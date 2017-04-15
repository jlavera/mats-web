import {fromJS} from 'immutable';
import {
  CAREERSLIST_REQUEST,
  CAREERSLIST_SUCCESS,
  CAREERSLIST_ERROR,
  SELECT_CAREER
} from './actions';

export const initialState = fromJS({
  careers: {
    list:         [],
    isFetching:   false,
    error:        '',
    selected:     ''
  }
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CAREERSLIST_REQUEST:
      return state
        .set('isFetching', true)
        .set('error', '')
        .set('list', [])
      ;
    case CAREERSLIST_SUCCESS:
      return state
        .set('isFetching', false)
        .set('list', action.payload.careers)
      ;
    case CAREERSLIST_ERROR:
      return state
        .set('isFetching', false)
        .set('error', action.payload.error)
      ;
    case SELECT_CAREER:
      return state
        .set('selected', action.payload.code)
      ;
    default:
      return state;
  }
}
