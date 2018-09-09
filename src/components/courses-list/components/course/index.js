import React, { Fragment } from 'react'
import { func, string, shape } from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
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
    <div className={classNames(['course-holder', {'course-holder-blocked': isBlockedToSign(course)}])}>
      <StateSwitch course={course} onChangeState={onChangeState} />

      <div className='course-name'>{name}</div>
      <div className='course-hours'>{hours}hs</div>

      {isBlockedToSign(course) &&
        <Fragment>
          <i data-tip data-for='lock-tooltip' className={classNames(['fas', 'fa-lock', 'course-lock'])} />
          <ReactTooltip id='lock-tooltip' type='error'>
            <span>Bloqueada para cursar</span>
          </ReactTooltip>
        </Fragment>
      }

      {!isBlockedToSign(course) && isBlockedToApprove(course) &&
        <Fragment>
          <i data-tip data-for='exclamation-tooltip' className={classNames(['fas', 'fa-exclamation', 'course-exclamation'])} />
          <ReactTooltip id='exclamation-tooltip' type='warning'>
            <span>Bloqueada para rendir final</span>
          </ReactTooltip>
        </Fragment>
      }

      <div>
        <DependenciesHolder
          text='P/ cursar'
          code={course.code}
          requiredState='S'
          isBlocked={isBlockedToSign(course)}
          signed={course.dependencies.signed}
          approved={course.dependencies.approved}
        />

        <DependenciesHolder
          text='P/ rendir final' 
          code={course.code}
          requiredState='A'
          isBlocked={isBlockedToSign(course)}
          signed={[]}
          approved={[ ...course.dependencies.signed, ...course.dependencies.approved]}
        />
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
