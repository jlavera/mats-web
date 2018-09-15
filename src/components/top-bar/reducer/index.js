import {
  UPDATE_PREVIEW_MODE_ENABLED
} from '../actions';

const initialState = {
  previewMode: false
};

export default function (state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case UPDATE_PREVIEW_MODE_ENABLED:
      return { ...state, previewMode: action.payload.state };
    default:
      return state;
  }
}
