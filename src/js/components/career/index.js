import React, { Component }   from 'react'
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

class Career extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.props.onClick}>
        <b>{this.props.career.code}</b> {this.props.career.name} { this.props.selected === this.props.career.code ? '*' : ''}
      </div>
    );
  }
};

export default Career;
