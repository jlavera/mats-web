import React, { Component } from 'react';
import { string, shape, arrayOf, number } from 'prop-types';

import './style.css';

class OptativeDropDown extends Component {
  state = {
    listVisible: false,
    selected:    undefined
  }

  toggleShow() {
    this.setState({ listVisible: !this.state.listVisible });
  }
  select(item) {
    this.setState({ selected: item });
    this.toggleShow();
  };

  renderListItems(options, year, index) {
    return options
      .map((option, optIndex) => (<div className='dropdown-item' key={`${year}-${index}-${optIndex}-${option.code}`} onClick={ this.select.bind(this, option) }>{ option.name }</div>));
  };

  render() {
    const {
      year,
      index,
      options
    } = this.props;

    return (
      <div className={'dropdown-container' + (this.state.listVisible ? ' show' : '')}>
        <div className={'dropdown-display' + (this.state.listVisible ? ' clicked': '')} onClick={ this.toggleShow.bind(this) }>
          <div className='selected-name'>{ this.state.selected ? this.state.selected.name : 'Seleccionar materia' }</div>
          <i className='fa fa-angle-down'></i>
        </div>
        <div className={'dropdown-list' + (this.state.listVisible ? ' show' : ' hide')}>
          <div>
            { this.renderListItems(options, year, index) }
          </div>
        </div>
      </div>
    );
  };
};

OptativeDropDown.defaultProps = {
  options:  [],
  selected: undefined
};

OptativeDropDown.propTypes = {
  year: number.isRequired,
  index: number.isRequired,
  options: arrayOf(shape({
    code: string.isRequired,
    name: string.isRequired
  })).isRequired,
  selected: string
};

export default OptativeDropDown;
