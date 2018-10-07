export const SHOW_DROPDOWN = 'SHOW_DROPDOWN';
export const HIDE_DROPDOWN = 'HIDE_DROPDOWN';

const showDropDown = () => ({
  type: SHOW_DROPDOWN
});

const hideDropDown = () => ({
  type: HIDE_DROPDOWN
});

export const doShowDropDown = () => {
  return dispatch => {
    dispatch(showDropDown());
  };
};

export const doHideDropDown = () => {
  return dispatch => {
    dispatch(hideDropDown());
  };
};
