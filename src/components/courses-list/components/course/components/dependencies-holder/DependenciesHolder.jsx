import React, { Fragment } from 'react';
import { arrayOf, string, shape } from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import './DependenciesHolder.css';

const isSignedOrApproved = state => state === 'S' || state === 'A';
const isApproved = state => state === 'A';

const DependenciesHolder = ({
  code,
  requiredState,
  text,
  isBlocked,
  signed,
  approved
}) => {
  const tooltipId = `course-${code}-${requiredState}-tooltip`;

  const signedList = (
    <Fragment>
      <b>Cursadas:</b>
      <ul className="dependencies-list-tooltip">
        {signed.map(course => (
          <li
            className={cx('dependency', {
              'dependency-crossed': isSignedOrApproved(course.state)
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
        {approved.map(course => (
          <li
            className={cx('dependency', {
              'dependency-crossed': isApproved(course.state)
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
      {signed.length !== 0 && signedList}
      {approved.length !== 0 && approvedList}
    </Fragment>
  );

  const actualSignedCount = signed.filter(c => isSignedOrApproved(c.state))
    .length;
  const actualApprovedCount = approved.filter(c => isApproved(c.state)).length;

  const totalSignedRequired = signed.length;
  const totalApprovedRequired = approved.length;

  const actualSum = actualSignedCount + actualApprovedCount;
  const totalSum = totalSignedRequired + totalApprovedRequired;

  const legend = `${text} ${totalSum === 0 ? '-' : `${actualSum}/${totalSum}`}`;

  const circleClassname = cx(
    'dependencies-circle',
    { 'gray-circle': isBlocked },
    { 'yellow-circle': actualSum !== totalSum && !isBlocked },
    { 'green-circle': actualSum === totalSum }
  );

  return (
    <div className="dependencies-holder">
      <div
        data-tip
        data-for={tooltipId}
        aria-haspopup="true"
        className={circleClassname}
      />
      {signed.length + approved.length !== 0 && (
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
  approved: arrayOf(
    shape({
      name: string.isRequired,
      code: string.isRequired
    })
  ),
  signed: arrayOf(
    shape({
      name: string.isRequired,
      code: string.isRequired
    })
  )
};

export default DependenciesHolder;
