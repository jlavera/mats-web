import React from 'react'
import { withRouter } from 'react-router'
import classNames from 'classnames';
import { func, shape, string } from 'prop-types';
import ReactTooltip from 'react-tooltip';

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

const stateString = state => isApproved(state) ? 'Aprobada' : isSigned(state) ? 'Firmada' : 'Pendiente';

const StateSwitch = props => {
  const {
    course: { code, state },
    onChangeState,
    readMode
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
      {readMode ? (
          <div className={classNames(['status-read-mode', `status-read-mode-${state}`])}>{stateString(state)}</div>
        ) : (
          <div className={lineClass}>
            <div data-tip data-for='dot-pending' className={pendingClass} onClick={() => onChangeState('P', code)} />
            <ReactTooltip id='dot-pending' type='dark'>
            <span>Pendiente</span>
            </ReactTooltip>

            <div data-tip data-for='dot-signed' className={signedClass} onClick={() => onChangeState('S', code)} />
            <ReactTooltip id='dot-signed' type='dark'>
            <span>Firmada</span>
            </ReactTooltip>

            <div data-tip data-for='dot-approved' className={approvedClass} onClick={() => onChangeState('A', code)} />
            <ReactTooltip id='dot-approved' type='dark'>
            <span>Aprobada</span>
            </ReactTooltip>

          </div>
      )}
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
