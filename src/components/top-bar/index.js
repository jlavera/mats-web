import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router';
import {
  isPreviewModeEnabledSelector
} from '../../shared/selectors';
import { compose } from 'ramda';

import { doUpdatePreviewModeEnabled } from '../../shared/actions';

import './style.css';

class TopBar extends Component {
  render() {
    return (
      <div id='top-bar'>
        <label id='top-bar-switch'>
          <input id='top-bar-input' type='checkbox' onClick={() => this.props.doUpdatePreviewModeEnabled(!this.props.previewMode)}/>
          <span id='top-bar-slider'></span>
        </label>
        <div id='top-bar-text'>Modo borrador (Los cambios no serán guardados)</div>
      </div>
    );
  }
};

const actions = { doUpdatePreviewModeEnabled };

const mapStateToProps = state => ({
  previewMode: isPreviewModeEnabledSelector(state)
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, actions)
);

export default enhance(TopBar);
