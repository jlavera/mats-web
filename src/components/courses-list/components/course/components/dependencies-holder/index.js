import React from 'react'
import { arrayOf, string, shape } from 'prop-types';
import './style.css';

const DependenciesHolder = props => (
  <div className='dependencies-holder'>
    <div className='circle green'></div>
    <div className='dependencies-holder-text'>
      { props.text } 1/{ props.signed.length + props.approved.length }
    </div>
  </div>
);

DependenciesHolder.propTypes = {
  text: string.isRequired,
  requiredState: string.isRequired,
  dependencies: shape({
    approved: arrayOf(shape({
      name: string.isRequired,
      code: string.isRequired
    })),
    signed: arrayOf(shape({
      name: string.isRequired,
      code: string.isRequired
    }))
  })
};

export default DependenciesHolder;
