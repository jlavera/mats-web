import React from 'react';
import { withRouter } from 'react-router';
import { omit } from 'ramda';

export default Component =>
  withRouter(props => {
    const query = props.location.query;

    const readMode = query.readMode === 'true';

    return (
      <Component
        query={query}
        readMode={readMode}
        {...omit(['router', 'location', 'routes'], props)}
      />
    );
  });
