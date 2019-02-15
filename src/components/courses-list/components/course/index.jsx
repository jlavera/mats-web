import React, { Fragment } from 'react'
import { func, string, shape } from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { prop, sortBy } from 'ramda';
import Select from 'react-select';

import { DependenciesHolder, StateSwitch } from './components';
import { withQueryParams } from '../../../utils';
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

const isOptative = course => !!course.optative;

const Course = props => {
  const {
    course,
    onChangeState,
    selectedOptional,
    readMode
  }                     = props;
  const { hours, name } = course;

  const options = sortBy(prop('name'), course.options || [])
    .map(option => ({
      value: option.code,
      label: option.name
    }));

  return (
    <div className={classNames(['course-holder', {'course-holder-blocked': isBlockedToSign(course)}, {'course-holder-read-mode': readMode}])}>
      <StateSwitch
        course={ course }
        onChangeState={ onChangeState } />

      { isOptative(course) ?
        <Select
          value={ selectedOptional }
          placeholder='Seleccionar materia'
          className = 'basic-single'
          classNamePrefix = 'optionals-select'
          isDisabled = { false }
          isLoading = { false }
          isClearable = { false }
          isRtl = { false }
          isSearchable = { true }
          name = 'options'
          options = { options }
        /> : <div className='course-name-holder course-name'>{ name }</div>
      }
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

      <div className='course-dependencies-holder'>
        <DependenciesHolder
          text='P/ cursar'
          code={course.code}
          requiredState='S'
          isBlocked={isBlockedToSign(course)}
          signed={course.dependencies.signed}
          approved={course.dependencies.approved}
        />

        <DependenciesHolder
          text='P/ final'
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
    name: string,
    state: string,
  }).isRequired,
  onChangeState: func.isRequired,
};

export default withQueryParams(Course);
