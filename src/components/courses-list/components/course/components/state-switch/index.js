import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bool, func, shape, string } from 'prop-types';
import ReactTooltip from 'react-tooltip';
import {
  isPreviewModeEnabledSelector
} from '../../../../../../shared/selectors';
import { compose } from 'ramda';

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
    previewMode,
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

  const changeState = newState => onChangeState({[code]: newState}, previewMode);

  return (
    <div className='state-switch-holder'>
      {readMode ? (
          <div className={classNames(['status-read-mode', `status-read-mode-${state}`])}>{stateString(state)}</div>
        ) : (
          <div className={lineClass}>
            <div data-tip data-for='dot-pending' className={pendingClass} onClick={() => changeState('P')} />
            <ReactTooltip id='dot-pending' type='dark'>
            <span>Pendiente</span>
            </ReactTooltip>

            <div data-tip data-for='dot-signed' className={signedClass} onClick={() => changeState('S')} />
            <ReactTooltip id='dot-signed' type='dark'>
            <span>Firmada</span>
            </ReactTooltip>

            <div data-tip data-for='dot-approved' className={approvedClass} onClick={() => changeState('A')} />
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
  previewMode: bool.isRequired,
  onChangeState: func.isRequired,
  readMode: bool
};

const mapStateToProps = state => ({
  previewMode: isPreviewModeEnabledSelector(state)
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, {})
);

export default enhance(StateSwitch);
