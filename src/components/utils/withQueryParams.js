import React          from 'react';
import { withRouter } from 'react-router';

export default Component => withRouter(props => {
  const readMode             = props.location.query.readMode === 'true';
  const { ...originalProps } = props;

  return <Component readMode={readMode} {...originalProps}/>
});
