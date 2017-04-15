import React, { Component }   from 'react'

class Dependency extends Component {
  constructor(props) {
    super(props);

    this.crossed = this.crossed.bind(this);
  }

  crossed() {
    return (this.props.course.type === 'S' && (this.props.course.state === 'A' || this.props.course.state === 'S')) || (this.props.course.type === 'A' && this.props.course.state === 'A');
  }

  render() {
    return (
      <div className={this.crossed() ? 'crossed' : ''}>
        &nbsp;&nbsp;&nbsp;&nbsp;[{this.props.course.type === 'S' ? 'F' : 'A'}] {this.props.course.name}
      </div>
    );
  }
};

export default Dependency;
