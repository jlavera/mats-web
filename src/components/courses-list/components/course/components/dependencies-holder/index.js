import React, { Fragment } from 'react';
import { arrayOf, string, shape } from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import './style.css';

const isSigned   = state => state === 'S' || state === 'A';
const isApproved = state => state === 'A';

const RemainingRequirementsLabel = ({ text, signed, approved }) => {
  const actualSignedCount   = signed.filter(c => isSigned(c.state)).length;
  const actualApprovedCount = approved.filter(c => isApproved(c.state)).length;

  const totalSignedRequired   = signed.length;
  const totalApprovedRequired = approved.length;

  return <span>{text} { actualSignedCount + actualApprovedCount }/{totalSignedRequired + totalApprovedRequired}</span>
}

const DependenciesHolder = props => {
  const {
    code,
    requiredState,
    text,
    signed,
    approved
  } = props;

  const tooltipId  = `course-${code}-${requiredState}-tooltip`;
  const signedList = (
    <Fragment>
      <b>Para cursar:</b>
      <ul className='dependencies-list-tooltip'>
        { signed.map(course => (
          <li className={cx(['dependency', {'dependency-crossed': isSigned(course.state)}])}>{ course.name }</li>
        )) }
      </ul>
    </Fragment>
  );
  const approvedList = (
    <Fragment>
      <b>Para aprobar:</b>
      <ul className='dependencies-list-tooltip'>
        { approved.map(course => (
          <li className={cx(['dependency', {'dependency-crossed': isApproved(course.state)}])}>{ course.name }</li>
        )) }
      </ul>
    </Fragment>
  );
  const dependenciesList = (
    <div>
      {signed.length ? signedList : ''}
      {approved.length ? approvedList : ''}
    </div>
  );

  return (
    <div className='dependencies-holder'>
      <div data-tip data-for={tooltipId} aria-haspopup='true' className='circle'></div>
      <ReactTooltip id={tooltipId} type='dark'>{dependenciesList}</ReactTooltip>

      <div className='dependencies-holder-text'>
        <RemainingRequirementsLabel text={text} signed={signed} approved={approved} />
      </div>
    </div>
  );
};

DependenciesHolder.propTypes = {
  text: string.isRequired,
  requiredState: string.isRequired,
  approved: arrayOf(shape({
    name: string.isRequired,
    code: string.isRequired
  })),
  signed: arrayOf(shape({
    name: string.isRequired,
    code: string.isRequired
  }))
};

export default DependenciesHolder;
