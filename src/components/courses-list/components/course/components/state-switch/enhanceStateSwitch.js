import { connect } from 'react-redux';
import { compose } from 'ramda';

import { isPreviewModeEnabledSelector } from '../../../../../../shared/selectors';

import { withQueryParams } from '../../../../../utils';

const enhanceStateSwitch = StateSwitchComponent => {
  const mapStateToProps = state => ({
    previewMode: isPreviewModeEnabledSelector(state)
  });

  const enhance = compose(
    withQueryParams,
    connect(mapStateToProps)
  );

  return enhance(StateSwitchComponent);
};

export default enhanceStateSwitch;
