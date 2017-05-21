import React, { Component }   from 'react'
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

require('./style.styl');

class Career extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="career" onClick={this.props.onClick}>
        <img className={(this.props.selected === this.props.career.code ?  "selected" : "") + " career-image"} src={`/public/images/${this.props.career.code}.png`} />
      </div>
    );
  }
};

export default Career;
