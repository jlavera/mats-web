import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { doGetCareers }     from './actions';
import { Career }           from './components';
import {
  careersSelector,
  isFetchingCareerSelector,
  careersErrorSelector
} from './selectors';

import './style.css';

class CareersList extends Component {
  state = {
    selectedCareerCode: 'K'
  }

  componentDidMount() {
    // this.props.doGetCareers();
  }

  selectCareer = code => {
    this.setState({ selectedCareerCode: code });
  }

  renderCareer = career => {
    const { code, name } = career;
    const { selectedCareerCode } = this.state;

    return (
      <Career
        key={code}
        // image={}
        name={name}
        onClick={() => this.selectCareer(code)}
        selected={code === selectedCareerCode}
      />
    );
  }

  render() {
    const { isFetching, list } = this.props;

    if (isFetching) {
      return <div>Cargando carreras...</div>;
    }

    return (
      <div className="flexcontainervertical careers-list hidden">
        {list.map(this.renderCareer)}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  list:       careersSelector(state),
  isFetching: isFetchingCareerSelector(state),
  error:      careersErrorSelector(state),
});

export default connect(mapStateToProps, { doGetCareers })(CareersList)
