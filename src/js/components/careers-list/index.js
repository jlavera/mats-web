import React, { Component }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { careersList }        from './reducer';

import {
  doGetCareers,
  doSelectCareer
 } from './actions';

import Career from '../career';

require('./style.styl');

class CareersList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fs.doGetCareers();
    this.props.fs.doSelectCareer('K');
  }

  render() {
    if (this.props.isFetching) {
      return <div>Cargando carreras...</div>;
    }

    return (
      <div>
        <div className="flexcontainervertical careers-list hidden">
          {this.props.list.map(career => (
            <Career key={career.code} career={career} onClick={() => this.props.fs.doSelectCareer(career.code)} selected={this.props.selected}/>
          ))}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state = careersList.initialState) {
  return {
    list:       state.careersList.get('list', []),
    isFetching: state.careersList.get('isFetching', false),
    error:      state.careersList.get('error', ''),
    selected:   state.careersList.get('selected', '')
  };
}

function mapDispatchToProps(dispatch){
  return {
    fs: bindActionCreators({
      doGetCareers,
      doSelectCareer
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CareersList)
