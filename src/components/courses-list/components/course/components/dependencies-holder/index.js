import React from 'react'
import { string } from 'prop-types';
import './style.css';

const DependenciesHolder = props => (
  <div className='dependencies-holder'>
    <div className='circle green'></div>
    <div className='dependencies-holder-text'>{ props.text } 1/3</div>
  </div>
);

DependenciesHolder.propTypes = {
  text: string.isRequired,
};

export default DependenciesHolder;
