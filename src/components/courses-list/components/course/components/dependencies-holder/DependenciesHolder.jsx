import React, { Fragment } from 'react';
import { arrayOf, string, shape } from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import './DependenciesHolder.css';

const isSignedOrApproved = course =>
  course.state === 'S' || course.state === 'A';

const isApproved = course => course.state === 'A';

const DependenciesHolder = ({
  code,
  requiredState,
  text,
  isBlocked,
  hasToBeSignedList,
  hasToBeApprovedList
}) => {
  const tooltipId = `course-${code}-${requiredState}-tooltip`;

  const signedList = (
    <Fragment>
      <b>Cursadas:</b>
      <ul className="dependencies-list-tooltip">
        {hasToBeSignedList.map(course => (
          <li
            className={cx('dependency', {
              'dependency-crossed': isSignedOrApproved(course)
            })}
          >
            {course.name}
          </li>
        ))}
      </ul>
    </Fragment>
  );

  const approvedList = (
    <Fragment>
      <b>Aprobadas:</b>
      <ul className="dependencies-list-tooltip">
        {hasToBeApprovedList.map(course => (
          <li
            className={cx('dependency', {
              'dependency-crossed': isApproved(course)
            })}
          >
            {course.name}
          </li>
        ))}
      </ul>
    </Fragment>
  );

  const dependenciesList = (
    <Fragment>
      {hasToBeSignedList.length !== 0 && signedList}
      {hasToBeApprovedList.length !== 0 && approvedList}
    </Fragment>
  );

  const actualSignedCount = hasToBeSignedList.filter(isSignedOrApproved).length;
  const actualApprovedCount = hasToBeApprovedList.filter(isApproved).length;

  const totalSignedRequired = hasToBeSignedList.length;
  const totalApprovedRequired = hasToBeApprovedList.length;

  const metRequirementsSum = actualSignedCount + actualApprovedCount;
  const totalRequirementsSum = totalSignedRequired + totalApprovedRequired;

  const courseHasAnyRequirements = totalRequirementsSum !== 0;

  const legend = `${text} ${
    courseHasAnyRequirements
      ? `${metRequirementsSum}/${totalRequirementsSum}`
      : '-'
  }`;

  const circleClassname = cx(
    'dependencies-circle',
    { 'gray-circle': isBlocked },
    {
      'yellow-circle': metRequirementsSum !== totalRequirementsSum && !isBlocked
    },
    { 'green-circle': metRequirementsSum === totalRequirementsSum }
  );

  return (
    <div className="dependencies-holder">
      <div
        data-tip
        data-for={tooltipId}
        aria-haspopup="true"
        className={circleClassname}
      />
      {courseHasAnyRequirements && (
        <ReactTooltip id={tooltipId} type="dark">
          {dependenciesList}
        </ReactTooltip>
      )}
      <div className="dependencies-holder-text">{legend}</div>
    </div>
  );
};

DependenciesHolder.propTypes = {
  text: string.isRequired,
  requiredState: string.isRequired,
  hasToBeApprovedList: arrayOf(
    shape({
      name: string.isRequired,
      code: string.isRequired
    })
  ),
  hasToBeSignedList: arrayOf(
    shape({
      name: string.isRequired,
      code: string.isRequired
    })
  )
};

export default DependenciesHolder;
