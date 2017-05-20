import React, { Component }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { coursesList }        from './reducer';
import {
  doGetCoursesForCareer,
  doChangeStateCourse
 } from './actions';

import Year from '../year';

class CoursesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.selected && !this.props.isFetching && this.props.selected !== this.props.loaded) {
      this.props.fs.doGetCoursesForCareer(this.props.selected);
    }
  }

  render() {
    if (this.props.isFetching) {
      return <div>Cargando materias...</div>;
    }

    return (
      <div>
        <div className="flexcontainerhorizontal row center">
          {this.props.list.map((courses, index) =>
            <Year key={index} year={index + 1} courses={courses} onChangeState={this.props.fs.doChangeStateCourse} />
          )}
        </div>
      </div>
    );
  }
};

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

function mapStateToProps(state = coursesList.initialState) {
  return {
    list:       groupByYear(state.coursesList.get('fixture', {})),
    isFetching: state.coursesList.get('isFetching', false),
    error:      state.coursesList.get('error', ''),
    selected:   state.careersList.get('selected', ''),
    loaded:     state.coursesList.get('loaded', '')
  };
}

function mapDispatchToProps(dispatch){
  return {
    fs: bindActionCreators({
      doGetCoursesForCareer,
      doChangeStateCourse
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);
