import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTooltip         from 'react-tooltip';
import {
  isPreviewModeEnabledSelector
} from '../../shared/selectors';
import { compose } from 'ramda';
import cx from 'classnames';

import { doUpdatePreviewModeEnabled } from '../../shared/actions';
import { withQueryParams } from '../utils';

import './style.css';

class TopBar extends Component {
  render() {
    const {
      doUpdatePreviewModeEnabled,
      previewMode,
      readMode
    } = this.props;

    const getClassName = active => cx(
      'top-bar-text',
      active ? 'active' : 'inactive'
    );

    return (
      <div id='top-bar'>
        <div id='google-sign-in' className={ readMode ? 'hidden' : ''}>
          <div className='g-signin2' data-onsuccess={(user) => onSignIn(user)}></div>
          <a href='#' onClick={signOut}>Sign out</a>
        </div>
        <div id='preview-switch' className={ readMode ? 'hidden' : ''}>
          <div className='top-bar-text'>Modo borrador: </div>
          <div className={getClassName(!previewMode)}>Desactivado</div>
          <label id='top-bar-switch'>
            <input id='top-bar-input' type='checkbox' onClick={() => doUpdatePreviewModeEnabled(!previewMode)}/>
            <span id='top-bar-slider'></span>
          </label>
          <div className={getClassName(previewMode)}>Activado <i data-tip data-for='preview-info-tooltip' className='preview-info fa fa-question-circle'></i></div>
          <ReactTooltip id='preview-info-tooltip' type='dark' place='left'>
            <span>Los cambios en modo borrador no se guardarán y al desactivarlo se volverá al último estado guardado.</span>
          </ReactTooltip>
        </div>
        <div id='go-page-button' className={ !readMode ? 'hidden' : ''}>
          <a href='http://www.materiasutn.com' target='_blank'>
            <div id='go-page-button-text'>
              Ver completo <i className='fa fa-external-link-alt' />
            </div>
          </a>
        </div>
      </div>
    );
  }
};

const actions = { doUpdatePreviewModeEnabled };

const mapStateToProps = state => ({
  previewMode: isPreviewModeEnabledSelector(state)
});

const enhance = compose(
  withQueryParams,
  connect(mapStateToProps, actions)
);

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
  gapi.auth2.getAuthInstance() // eslint-disable-line no-undef
    .signOut()
    .then(function () {
      console.log('User signed out.');
  });
}

export default enhance(TopBar);
