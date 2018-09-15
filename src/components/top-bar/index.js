import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router';
import {
  isPreviewModeEnabledSelector
} from './selectors';
import { compose } from 'ramda';

import { doUpdatePreviewModeEnabled } from './actions';

import './style.css';

class TopBar extends Component {
  state = {
    previewMode: false
  }

  render() {
    return (
      <div id='top-bar'>
        <label id='top-bar-switch'>
          <input id='top-bar-input' type='checkbox' onClick={() => this.props.doUpdatePreviewModeEnabled(!this.state.previewMode)}/>
          <span id='top-bar-slider'></span>
        </label>
        Modo borrador (Los cambios no serán guardados)
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
