import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

export default class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div
        data-testid="feedback-text"
      >
        <Header />
        FeedBack
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}
Feedback.propTypes = {
  history: PropTypes.func.isRequired,
};
