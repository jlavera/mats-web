import React from 'react'
import { always, cond } from 'ramda';
import { DependenciesHolder, StateSwitch } from './components';
import './style.css';

const isBlockedToSign = course => {
  const { approved, signed } = course.dependencies;
  return signed.some(dep => !dep.state || dep.state === 'P') ||
    approved.some(dep => dep.state !== 'A');
}

const isBlockedToApprove = course => {
  const { approved, signed } = course.dependencies;
  return signed.some(dep => dep.state !== 'A') ||
    approved.some(dep => dep.state !== 'A');
}

const hasDepsToSign = course => !!course.dependencies.signed.length;

const hasDepsToApprove = course => !!course.dependencies.approved.length;

const hasDependencies = course => hasDepsToSign(course) || hasDepsToApprove(course);

const isPending = course => !course.state || course.state === 'N';

const isSigned = course => course.state === 'S';

const isApproved = course => course.state === 'A';

const getStatus = cond([
  [ isApproved, always(<div className="bg-success text-white course-status">APROBADA</div>) ],
  [ isBlockedToSign, always(<div className="bg-success text-white course-status">BLOQUEADA</div>) ],
  [ isBlockedToApprove, always(<div className="bg-success text-white course-status">BLOQUEADA P/ FINAL</div>) ],
  [ isPending, always(<div className="bg-success text-white course-status">HABILITADA</div>) ],
  [ isSigned, always(<div className="bg-success text-white course-status">FIRMADA</div>) ],
]);

const Course = props => {
  const { 
    course: {
      hours,
      name,
      state
    }, 
    onChangeState
  } = props;
  
  return (
    <div className='course-holder'>
      {getStatus(course)}
      <StateSwitch course={course} currentState={state} onChangeState={onChangeState} />
      <div className='course-name'>{name}</div>
      <div className='course-hours'>{hours}hs</div>
      <DependenciesHolder text='Para firmar'/>
      <DependenciesHolder text='Para aprobar'/>
    </div>
  );
};

Course.propTypes = {
  course: shape({
    hours: string.isRequired,
    name: string.isRequired,
    state: string.isRequired,
  }).isRequired,
  onChangeState: func.isRequired,
};

export default Course;
