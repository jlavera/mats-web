import React from 'react'
import { arrayOf, string, shape } from 'prop-types';
import './style.css';

const RemainingRequirementsLabel = ({ text, signed, approved }) => {
  const actualSignedCount = signed.filter(c => c.state === 'S' || c.state === 'A').length;
  const actualApprovedCount = approved.filter(c => c.state === 'A').length;
  
  const totalSignedRequired = signed.length;
  const totalApprovedRequired = approved.length;

  return <span>{text} { actualSignedCount + actualApprovedCount }/{totalSignedRequired + totalApprovedRequired}</span>
}
const DependenciesHolder = props => {
  return (
    <div className='dependencies-holder'>
      <div className='circle green'></div>
      <div className='dependencies-holder-text'>
        <RemainingRequirementsLabel text={props.text} signed={props.signed} approved={props.approved} /> 
      </div>
    </div>
  );
};

DependenciesHolder.propTypes = {
  text: string.isRequired,
  requiredState: string.isRequired,
  approved: arrayOf(shape({
    name: string.isRequired,
    code: string.isRequired
  })),
  signed: arrayOf(shape({
    name: string.isRequired,
    code: string.isRequired
  }))
};

export default DependenciesHolder;
