import { bool, shape, string } from 'prop-types';

export default shape({
  code: string.isRequired,
  duration: string.isRequired,
  main: bool.isRequired,
  name: string.isRequired,
  optative: bool.isRequired,
});