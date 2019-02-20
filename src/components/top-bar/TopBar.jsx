import React from 'react';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import './TopBar.css';

const TopBar = ({ doUpdatePreviewModeEnabled, previewMode, readMode }) => {
  const topBarDeactivatedCx = cx('top-bar-text', {
    inactive: previewMode,
    active: !previewMode
  });

  const topBarActivatedCx = cx('top-bar-text', {
    inactive: !previewMode,
    active: previewMode
  });

  const hiddenIfReadmodeCx = cx({ hidden: readMode });

  const hiddenIfNotReadmodeCx = cx({ hidden: !readMode });

  return (
    <div id="top-bar">
      <div id="preview-switch" className={hiddenIfReadmodeCx}>
        <div className="top-bar-text">Modo borrador: </div>
        <div className={topBarDeactivatedCx}>Desactivado</div>
        <label id="top-bar-switch">
          <input
            id="top-bar-input"
            type="checkbox"
            onClick={() => doUpdatePreviewModeEnabled(!previewMode)}
          />
          <span id="top-bar-slider" />
        </label>
        <div className={topBarActivatedCx}>
          Activado{' '}
          <i
            data-tip
            data-for="preview-info-tooltip"
            className="preview-info fa fa-question-circle"
          />
        </div>
        <ReactTooltip id="preview-info-tooltip" type="dark" place="left">
          <span>
            Los cambios en modo borrador no se guardarán y al desactivarlo se
            volverá al último estado guardado.
          </span>
        </ReactTooltip>
      </div>
      <div id="go-page-button" className={hiddenIfNotReadmodeCx}>
        <a href="http://www.materiasutn.com" target="_blank">
          <div id="go-page-button-text">
            Ver completo <i className="fa fa-external-link-alt" />
          </div>
        </a>
      </div>
    </div>
  );
};

TopBar.propTypes = {};

export default TopBar;
