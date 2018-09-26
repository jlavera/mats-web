import { doChangeStatesFromCookie } from '../../components/courses-list/actions';

export const UPDATE_PREVIEW_MODE_ENABLED = 'UPDATE_PREVIEW_MODE_ENABLED';

const updatePreviewModeEnabled = state => {
  return {
    type: UPDATE_PREVIEW_MODE_ENABLED,
    payload: {
      state
    }
  };
};

export const doUpdatePreviewModeEnabled = state => {
  return dispatch => {
    if (!state) {
      dispatch(doChangeStatesFromCookie(false));
    }

    dispatch(updatePreviewModeEnabled(state));
  };
};
