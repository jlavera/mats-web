import {
  SHOW_DROPDOWN,
  HIDE_DROPDOWN
} from '../actions';

const initialState = {
  listVisible: false,
  selected:    undefined
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DROPDOWN:
      return { ...state, listVisible: true };
    case HIDE_DROPDOWN:
      return { ...state, listVisible: false };
    default:
      return state;
  }
}
