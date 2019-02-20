import React, { Fragment } from 'react';
import { func, string, shape } from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { DependenciesHolder, StateSwitch } from './components';
import { withQueryParams } from '../../../utils';
import './Course.css';

const isPending = course => !course.state || course.state === 'P';
const isNotApproved = course => course.state !== 'A';

const isBlockedToSign = course => {
  const {
    approved: mustBeApproved,
    signed: mustBeSigned
  } = course.dependencies;

  return mustBeSigned.some(isPending) || mustBeApproved.some(isNotApproved);
};

const isBlockedToApprove = course => {
  const {
    approved: mustBeApproved,
    signed: mustBeSigned
  } = course.dependencies;

  return mustBeSigned.some(isNotApproved) || mustBeApproved.some(isNotApproved);
};

const Course = ({ course, onChangeState, readMode }) => {
  const { hours, name } = course;

  const mainClassName = classNames([
    'course-holder',
    { 'course-holder-blocked': isBlockedToSign(course) },
    { 'course-holder-read-mode': readMode }
  ]);

  return (
    <div className={mainClassName}>
      <StateSwitch course={course} onChangeState={onChangeState} />

      <div className="course-name">{name}</div>
      <div className="course-hours">{hours}hs</div>

      {isBlockedToSign(course) && (
        <Fragment>
          <i
            data-tip
            data-for="lock-tooltip"
            className="fas fa-lock course-lock"
          />
          <ReactTooltip id="lock-tooltip" type="error">
            <span>Bloqueada para cursar</span>
          </ReactTooltip>
        </Fragment>
      )}

      {!isBlockedToSign(course) && isBlockedToApprove(course) && (
        <Fragment>
          <i
            data-tip
            data-for="exclamation-tooltip"
            className="fas fa-exclamation course-exclamation"
          />
          <ReactTooltip id="exclamation-tooltip" type="warning">
            <span>Bloqueada para rendir final</span>
          </ReactTooltip>
        </Fragment>
      )}

      <div>
        <DependenciesHolder
          text="P/ cursar"
          code={course.code}
          requiredState="S"
          isBlocked={isBlockedToSign(course)}
          signed={course.dependencies.signed}
          approved={course.dependencies.approved}
        />

        <DependenciesHolder
          text="P/ final"
          code={course.code}
          requiredState="A"
          isBlocked={isBlockedToSign(course)}
          signed={[]}
          approved={[
            ...course.dependencies.signed,
            ...course.dependencies.approved
          ]}
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
    state: string
  }).isRequired,
  onChangeState: func.isRequired
};

export default withQueryParams(Course);
