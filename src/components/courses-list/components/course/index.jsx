import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { func, string, shape, number, arrayOf } from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { compose, flatten, prop, sortBy } from 'ramda';
import Select from 'react-select';

import { DependenciesHolder, StateSwitch } from './components';
import { changeOptative } from '../../actions';
import { withQueryParams } from '../../../utils';
import { optativesSelector } from '../../selectors';
import { isPreviewModeEnabledSelector } from '../../../../shared/selectors';
import './style.css';

const isBlockedToSign = course => {
  const { approved, signed } = course.dependencies;
  return (
    signed.some(dep => !dep.state || dep.state === 'P') ||
    approved.some(dep => dep.state !== 'A')
  );
};

const isBlockedToApprove = course => {
  const { approved, signed } = course.dependencies;
  return (
    signed.some(dep => dep.state !== 'A') ||
    approved.some(dep => dep.state !== 'A')
  );
};

const isOptative = course => !!course.optative;

const Course = props => {
  const {
    course,
    onChangeState,
    readMode,
    year,
    slotIndex,
    selectedOptatives
  } = props;

  const { code, hours, name } = course;

  const selectedOptativesCodes = flatten(
    Object.values(selectedOptatives).map(Object.values)
  );

  const options = sortBy(prop('name'), course.options || [])
    .filter(
      option =>
        option.code === code || !selectedOptativesCodes.includes(option.code)
    )
    .map(option => ({
      value: option.code,
      label: option.name
    }));

  const handleOptativeChange = selected => {
    selected.value &&
      props.changeOptative(
        {
          year,
          slotIndex,
          code: selected.value
        },
        props.previewMode
      );
  };

  return (
    <div
      className={classNames([
        'course-holder',
        { 'course-holder-blocked': isBlockedToSign(course) },
        { 'course-holder-read-mode': readMode }
      ])}
    >
      <StateSwitch
        course={course}
        onChangeState={onChangeState}
        disabled={isOptative(course) && !code}
      />

      {isOptative(course) ? (
        <Select
          value={options.find(o => o.value === code)}
          placeholder="Seleccionar materia"
          className="basic-single"
          classNamePrefix="optionals-select"
          onChange={handleOptativeChange}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="options"
          options={options}
        />
      ) : (
        <div className="course-name-holder course-name">{name}</div>
      )}
      <div className="course-hours">{hours}hs</div>

      {isBlockedToSign(course) && (
        <Fragment>
          <i
            data-tip
            data-for="lock-tooltip"
            className={classNames(['fas', 'fa-lock', 'course-lock'])}
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
            className={classNames([
              'fas',
              'fa-exclamation',
              'course-exclamation'
            ])}
          />
          <ReactTooltip id="exclamation-tooltip" type="warning">
            <span>Bloqueada para rendir final</span>
          </ReactTooltip>
        </Fragment>
      )}

      <div className="course-dependencies-holder">
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
  },
  year: null,
  slotIndex: null
};

Course.propTypes = {
  course: shape({
    hours: string.isRequired,
    name: string,
    state: string
  }).isRequired,
  year: number,
  slotIndex: number,
  onChangeState: func.isRequired
};

const mapStateToProps = state => ({
  selectedOptatives: optativesSelector(state),
  previewMode: isPreviewModeEnabledSelector(state)
});

const enhance = compose(
  withQueryParams,
  connect(
    mapStateToProps,
    { changeOptative }
  )
);

export default enhance(Course);
