import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router';

import { compose } from 'ramda';
import { doGetCoursesForCareer, doChangeStateCourses } from './actions';

import { Year } from './components';

import { formatWithStatusFromCommaSeparatedString } from './utils';
import { isFetchingCoursesSelector, sortedCoursesByYearSelector } from './selectors';
import { selectedCareerSelector } from '../careers-list/selectors';
import {
  isPreviewModeEnabledSelector
} from '../../shared/selectors';
import './style.css';

class CoursesList extends Component {
  state = {
    readMode: false,
  }

  static getDerivedStateFromProps(props) {
    return { readMode: props.location.query.readMode === 'true' };
  }

  componentDidMount() {
    const { signed, approved } = this.props.location.query;

    const parsedSigned = formatWithStatusFromCommaSeparatedString('S')(signed);
    const parseApproved = formatWithStatusFromCommaSeparatedString('A')(approved);

    const coursesState = { ...parsedSigned, ...parseApproved };

    this.props.doGetCoursesForCareer(this.props.selectedCareer, coursesState);
  }

  renderYear = ([year, courses]) => (
    <Year
      key={`year${year}`}
      year={+year}
      courses={courses}
      onChangeState={this.props.doChangeStateCourses}
      readMode={this.state.readMode}
    />
  )

  render() {
    const {
      isFetching,
      list,
    } = this.props;

    if (isFetching) {
      return <div>Cargando materias...</div>;
    }

    return (
      <div className="years-holder">
        {Object.entries(list).map(this.renderYear)}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  list:           sortedCoursesByYearSelector(state),
  isFetching:     isFetchingCoursesSelector(state),
  selectedCareer: selectedCareerSelector(state),
});

const actions = { doGetCoursesForCareer, doChangeStateCourses };

const enhance = compose(
  withRouter,
  connect(mapStateToProps, actions)
)

export default enhance(CoursesList);
