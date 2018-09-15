import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { doGetCareers }     from './actions';
import { Career }           from './components';
import {
  careersSelector,
  isFetchingCareerSelector,
  careersErrorSelector
} from './selectors';

import './style.css';

class TopBar extends Component {
  state = {
    previewMode: false
  }

  setPreviewMode = state => {
    this.setState({ previewMode: state });
  }

  render() {
    return (
      <div id='top-bar'>
        <label id='top-bar-switch'>
          <input id='top-bar-input' type='checkbox' />
          <span id='top-bar-slider'></span>
        </label>
        Modo borrador (Los cambios no serán guardados)
      </div>
    );
  }
};

export default TopBar;
