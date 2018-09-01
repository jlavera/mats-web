import React, { Component }   from 'react'

require('./style.css');

class DependenciesHolder extends Component {
  render() {
    return (
      <div className='dependencies-holder'>
        <div className='circle green'></div>
        <div className='dependencies-holder-text'>{ this.props.text } 1/3</div>
      </div>
    );
  }
};

export default DependenciesHolder;
