import React, { Component }   from 'react'
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

class Career extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="career" onClick={this.props.onClick}>
        <img className={(this.props.selected === this.props.career.code ?  "selected" : "") + " career-image"} src={`/public/images/${this.props.career.code}.png`} />
         {/*<div className="career-code">{this.props.career.code}</div> {this.props.career.name} { this.props.selected === this.props.career.code ? '*' : ''} */}
      </div>
    );
  }
};

export default Career;
