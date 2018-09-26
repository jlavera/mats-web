import { doChangeStatesFromCookie } from '../../components/courses-list/actions';

export const UPDATE_PREVIEW_MODE_ENABLED = 'UPDATE_PREVIEW_MODE_ENABLED';

const updatePreviewModeEnabled = previewState => {
  return {
    type: UPDATE_PREVIEW_MODE_ENABLED,
    payload: {
      state: previewState
    }
  };
};

export const doUpdatePreviewModeEnabled = previewState => {
  return dispatch => {
    if (!previewState) {
      dispatch(doChangeStatesFromCookie(false));
    }

    dispatch(updatePreviewModeEnabled(previewState));
  };
};
