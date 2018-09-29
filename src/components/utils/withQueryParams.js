import React          from 'react';
import { withRouter } from 'react-router';
import { omit }       from 'ramda';

export default Component => withRouter(props => {
  const query    = props.location.query;

  const readMode = query.readMode === 'true';
  const fromSiga = query.source === 'siga';

  return <Component readMode={readMode} fromSiga={fromSiga} {...omit(['router', 'location', 'routes'], props)}/>
});
