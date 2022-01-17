import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <p
          data-testid="ranking-title"
        />
        RAKING
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-go-home"
        >
          Go home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,

};
