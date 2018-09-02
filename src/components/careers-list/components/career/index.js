import React from 'react'
import './styles.css';
import { bool, func, string } from 'prop-types';
import cx from 'classnames';

const Career = props => {
  const {
    image,
    name,
    onClick,
    selected
  } = props;

  const className = cx(
    'career-image',
    { 'selected': selected }
  );

  return (
    <div className="career" onClick={onClick}>
      <img className={className} src={image} alt={name} />
    </div>
  );
}

Career.defaultProps = {
  image: '/images/image-not-found.png',
  selected: false,
}

Career.propTypes = {
  image: string,
  name: string.isRequired,
  onClick: func.isRequired,
  selected: bool,
}

export default Career;
