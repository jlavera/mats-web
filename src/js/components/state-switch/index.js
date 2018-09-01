import React, { Component }   from 'react'
import { withRouter }         from 'react-router'
import * as classNames        from 'classnames';

require('./style.css');

class StateSwitch extends Component {
  constructor(props) {
    super(props);
  }

  isPending() {
    return !this.props.currentState || this.props.currentState === 'P';
  }

  isSigned() {
    return this.props.currentState === 'S';
  }

  isApproved() {
    return this.props.currentState === 'A';
  }

  stringState() {
    return this.props.currentState === 'S' ? 'now-signed' :
      this.props.currentState === 'A' ? 'now-approved' : 'now-pending';
  }

  render() {
    return (
      <div className='state-switch-holder'>
        <div className={classNames('line', this.stringState())}>
          <div className={classNames('dot', 'pending', this.stringState(), this.isPending()  ? 'selected' : 'non-selected')}
            onClick={() => this.props.onChangeState('P', this.props.course.code)}>
          </div>
          <div className={classNames('dot', 'signed', this.stringState(), this.isSigned()  ? 'selected' : 'non-selected')}
            onClick={() => this.props.onChangeState('S', this.props.course.code)}>
          </div>
          <div className={classNames('dot', 'approved', this.stringState(), this.isApproved()  ? 'selected' : 'non-selected')}
            onClick={() => this.props.onChangeState('A', this.props.course.code)}>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(StateSwitch);
