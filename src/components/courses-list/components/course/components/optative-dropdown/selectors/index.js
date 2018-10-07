import { createSelector } from 'reselect';

const dropdownsSelector            = state => state.dropdowns;
export const dropdownStateSelector = (year, index) => dropdownsSelector[year][index];
