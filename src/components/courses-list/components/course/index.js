import React from 'react'
import { always, cond } from 'ramda';
import { func, string, shape } from 'prop-types';
import classNames from 'classnames';
import { DependenciesHolder, StateSwitch } from './components';
import './style.css';

const isBlockedToSign = course => {
  const { approved, signed } = course.dependencies;
  return signed.some(dep => !dep.state || dep.state === 'P') ||
    approved.some(dep => dep.state !== 'A');
}

const isBlockedToApprove = course => {
  const { approved, signed } = course.dependencies;
  return signed.some(dep => dep.state !== 'A') ||
    approved.some(dep => dep.state !== 'A');
}

const hasDepsToSign = course => !!course.dependencies.signed.length;

const hasDepsToApprove = course => !!course.dependencies.approved.length;

const hasDependencies = course => hasDepsToSign(course) || hasDepsToApprove(course);

const isPending = course => !course.state || course.state === 'N';

const isSigned = course => course.state === 'S';

const isApproved = course => course.state === 'A';

const Course = props => {
  const { course, onChangeState } = props;
  const { hours, name }           = course;

  return (
    <div className='course-holder'>
      <StateSwitch course={course} onChangeState={onChangeState} />
      <div className='course-name'>{name}</div>
      <div className='course-hours'>{hours}hs</div>
      <i className={classNames(['fas', 'fa-lock', 'course-lock', {'show': isBlockedToSign(course)}])}></i>
      <i className={classNames(['fas', 'fa-exclamation', 'course-exclamation', {'show': !isBlockedToSign(course) && isBlockedToApprove(course)}])}></i>
      <div>
        <DependenciesHolder text='Para firmar'  requiredState='S' signed={course.dependencies.signed} approved={course.dependencies.approved} />
        <DependenciesHolder text='Para aprobar' requiredState='A' signed={[]} approved={course.dependencies.signed.concat(course.dependencies.approved)} />
      </div>
    </div>
  );
};

Course.defaultProps = {
  course: {
    state: 'P'
  }
};

Course.propTypes = {
  course: shape({
    hours: string.isRequired,
    name: string.isRequired,
    state: string,
  }).isRequired,
  onChangeState: func.isRequired,
};

export default Course;
