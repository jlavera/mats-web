import React from 'react'
import { withRouter } from 'react-router'
import classNames from 'classnames';
import { func, shape, string } from 'prop-types';
 
import './style.css';

const isPending = currentState => !currentState || currentState === 'P';
const isSigned = currentState => currentState === 'S';
const isApproved = currentState => currentState === 'A';

const StateSwitch = props => {
  const { 
    currentState, 
    course: { code }, 
    onChangeState 
  } = props;

  const lineClass = classNames(
    'line',
    { 'now-signed': isSigned(currentState) },
    { 'now-approved': isApproved(currentState) },
    { 'now-pending': isPending(currentState) },
  );

  const pendingClass = classNames(
    'dot',
    { 'selected': isPending(currentState) },
    { 'non-selected': !isPending(currentState) },
  );

  const signedClass = classNames(
    'dot',
    { 'selected': isSigned(currentState) },
    { 'non-selected': !isSigned(currentState) },
  );

  const approvedClass = classNames(
    'dot',
    { 'selected': isApproved(currentState) },
    { 'non-selected': !isApproved(currentState) },
  );

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

StateSwitch.propTypes = {
  currentState: string.isRequired,
  course: shape({
    code: string.isRequired,
  }),
  onChangeState: func.isRequired,
};

export default withRouter(StateSwitch);
