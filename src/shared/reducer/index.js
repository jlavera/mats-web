import {
  UPDATE_PREVIEW_MODE_ENABLED
} from '../actions';

const initialState = {
  previewMode: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PREVIEW_MODE_ENABLED:
      return { ...state, previewMode: action.payload.state };
    default:
      return state;
  }
}
