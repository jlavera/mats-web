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
    dispatch(updatePreviewModeEnabled(state));
  };
};
