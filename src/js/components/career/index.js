import React, { Component }   from 'react'

require('./style.css');

class Career extends Component {
  render() {
    return (
      <div className="career" onClick={this.props.onClick}>
        <img className={(this.props.selected === this.props.career.code ?  "selected" : "") + " career-image"} src={`/static/images/${this.props.career.code}.png`} alt={this.props.career.name} />
      </div>
    );
  }
}

export default Career;
