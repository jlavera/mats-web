import { bool, shape, string } from 'prop-types';

export default shape({
  code: string,
  duration: string.isRequired,
  main: bool.isRequired,
  name: string,
  optative: bool.isRequired
});
