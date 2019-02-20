import React from 'react';
import { connect } from 'react-redux';
import { isPreviewModeEnabledSelector } from '../../shared/selectors';
import { compose } from 'ramda';

import { doUpdatePreviewModeEnabled } from '../../shared/actions';
import { withQueryParams } from '../utils';

const enhanceTopBar = TopBarComponent => {
  const TopBarContainer = ({
    doUpdatePreviewModeEnabled,
    previewMode,
    readMode
  }) => (
    <TopBarComponent
      doUpdatePreviewModeEnabled={doUpdatePreviewModeEnabled}
      previewMode={previewMode}
      readMode={readMode}
    />
  );

  const actions = { doUpdatePreviewModeEnabled };

  const mapStateToProps = state => ({
    previewMode: isPreviewModeEnabledSelector(state)
  });

  const enhance = compose(
    withQueryParams,
    connect(
      mapStateToProps,
      actions
    )
  );

  return enhance(TopBarContainer);
};

export default enhanceTopBar;
