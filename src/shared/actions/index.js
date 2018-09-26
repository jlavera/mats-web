import { doChangeStatesFromCookie } from '../../components/courses-list/actions';

export const UPDATE_PREVIEW_MODE_ENABLED = 'UPDATE_PREVIEW_MODE_ENABLED';

const updatePreviewModeEnabled = previewEnabled => {
  return {
    type: UPDATE_PREVIEW_MODE_ENABLED,
    payload: {
      state: previewEnabled
    }
  };
};

export const doUpdatePreviewModeEnabled = previewEnabled => {
  return dispatch => {
    if (!previewEnabled) {
      dispatch(doChangeStatesFromCookie(false));
    }

    dispatch(updatePreviewModeEnabled(previewEnabled));
  };
};
