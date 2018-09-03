import React from 'react'
import { withRouter } from 'react-router'
import classNames from 'classnames';
import { func, shape, string } from 'prop-types';

import './style.css';

const isPending = state => !state || state === 'P';
const isSigned = state => state === 'S';
const isApproved = state => state === 'A';

const isNowState = state => [
  { 'now-signed': isSigned(state) },
  { 'now-approved': isApproved(state) },
  { 'now-pending': isPending(state) }
];
const isSelected = (f, state) => [
  { 'selected': f(state) },
  { 'non-selected': !f(state) }
];

const StateSwitch = props => {
  const {
    course: { code, state },
    onChangeState
  } = props;

  const lineClass = classNames([
    'line'
  ].concat(isNowState(state)));

  const pendingClass = classNames([
    'dot',
    'pending',
  ].concat(isSelected(isPending, state), isNowState(state)));

  const signedClass = classNames([
    'dot',
    'signed'
  ].concat(isSelected(isSigned, state), isNowState(state)));

  const approvedClass = classNames([
    'dot',
    'approved'
  ].concat(isSelected(isApproved, state), isNowState(state)));

  return (
    <div className='state-switch-holder'>
      <div className={lineClass}>
        <div className={pendingClass} onClick={() => onChangeState('P', code)} />
        <div className={signedClass} onClick={() => onChangeState('S', code)} />
        <div className={approvedClass} onClick={() => onChangeState('A', code)} />
      </div>
    </div>
  );
};

StateSwitch.defaultProps = {
  course: {
    state: 'P'
  }
};

StateSwitch.propTypes = {
  course: shape({
    code: string.isRequired,
    state: string
  }),
  onChangeState: func.isRequired,
};

export default withRouter(StateSwitch);
