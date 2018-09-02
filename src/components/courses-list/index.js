import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router'

import { compose, reduce } from 'ramda';

import { doGetCoursesForCareer, doChangeStateCourse } from './actions';

import Year from './components/year';

function groupByYear(courses) {
  let groups = [];

  let course;
  Object.keys(courses).forEach(courseCode => {
    course = courses[courseCode];

    if (!groups[course.year]) {
      groups[course.year] = [];
    }

    groups[course.year].push(course);
  });

  // groups = groups.sort((dep1, dep2) => dep1.name < dep2.name ? 1 : -1);

  // remove year 0
  return groups.slice(1);
}

// const groupByYear = courses => {
//   console.log(courses);
//   return Object.keys(courses).reduce((acc, code) => ({  }), {});
// }
// const groupByYear = courses => courses.reduce((acc, course) => ({ [course.year]: [ ...acc[course.year], course ] }), {});

const parseCommaSeparatedQueryParam = param => (param || '').split(',').filter(Boolean);

const formatWithCourseStatus = status => reduce((acc, code) => ({ ...acc, [code]: status }), {});

// lel da namez - luquitas be proud
const formatWithStatusFromCommaSeparatedQueryParam = status => compose(formatWithCourseStatus(status), parseCommaSeparatedQueryParam);

// TODO: mover las 4 a utils o a un selector

class CoursesList extends Component {
  state = {
    readMode: false,
  }

  static getDerivedStateFromProps(props) {
    return { readMode: props.location.query.readMode === 'true' };
  }

  componentDidMount() {
    const { signed, approved } = this.props.location.query;

    const parsedSigned = formatWithStatusFromCommaSeparatedQueryParam('S')(signed);
    const parseApproved = formatWithStatusFromCommaSeparatedQueryParam('A')(approved);

    const coursesState = { ...parsedSigned, ...parseApproved };

    this.props.doGetCoursesForCareer('K' /* this.props.selected TODO: esta no va a existir si esta en el state de careers */, coursesState);
  }

  renderYear = ([year, courses]) => (
    <Year
      key={`year${year}`}
      year={year}
      courses={courses}
      onChangeState={this.props.doChangeStateCourse}
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
      <div className="flexcontainerhorizontal row center">
        {Object.entries(list).map(this.renderYear)}
      </div>
    );
  }
};

// selector me plz
const mapStateToProps = state => ({
  list:       groupByYear(state.coursesList.fixture),
  isFetching: state.coursesList.isFetching,
  error:      state.coursesList.error,
  selected:   state.careersList.selected,
  loaded:     state.coursesList.loaded,
});

const actions = { doGetCoursesForCareer, doChangeStateCourse };

const enhance = compose(
  withRouter,
  connect(mapStateToProps, actions)
)

export default enhance(CoursesList);
