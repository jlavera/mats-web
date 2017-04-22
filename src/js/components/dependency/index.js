import React, { Component }   from 'react'

class Dependency extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={(this.props.course.crossed ? 'crossed' : '') + " dependency"}>
        &nbsp;&nbsp;&nbsp;&nbsp;[{this.props.course.type === 'S' ? 'F' : 'A'}] {this.props.course.course.name}
      </div>
    );
  }
};

export default Dependency;
