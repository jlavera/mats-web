import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';

import {
  isFetchingCoursesSelector,
  sortedCoursesByYearSelector
} from './selectors';

import { doGetCoursesForCareer, doChangeStateCourses } from './actions';
import { withQueryParams } from '../utils';
import { formatWithStatusFromCommaSeparatedString } from './utils';

// import { selectedCareerSelector } from './selectors';
const selectedCareerSelector = () => 'K';

const enhanceCoursesList = CoursesListComponent => {
  class CoursesListContainer extends Component {
    componentDidMount() {
      const { signed, approved } = this.props.query;

      const parsedSigned = formatWithStatusFromCommaSeparatedString('S')(
        signed
      );
      const parseApproved = formatWithStatusFromCommaSeparatedString('A')(
        approved
      );

      const coursesState = { ...parsedSigned, ...parseApproved };

      this.props.doGetCoursesForCareer(this.props.selectedCareer, coursesState);
    }

    render() {
      const { readMode, isFetching, list, doChangeStateCourses } = this.props;

      return (
        <CoursesListComponent
          readMode={readMode}
          isFetching={isFetching}
          list={list}
          doChangeStateCourses={doChangeStateCourses}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    list: sortedCoursesByYearSelector(state),
    isFetching: isFetchingCoursesSelector(state),
    selectedCareer: selectedCareerSelector(state)
  });

  const actions = { doGetCoursesForCareer, doChangeStateCourses };

  const enhance = compose(
    withQueryParams,
    connect(
      mapStateToProps,
      actions
    )
  );

  return enhance(CoursesListContainer);
};

export default enhanceCoursesList;
