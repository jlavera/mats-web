import { compose, reduce } from 'ramda';

const parseCommaSeparatedString = param =>
  (param || '').split(',').filter(Boolean);

const formatWithCourseStatus = status =>
  reduce((acc, code) => ({ ...acc, [code]: status }), {});

export default status =>
  compose(
    formatWithCourseStatus(status),
    parseCommaSeparatedString
  );
