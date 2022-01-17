import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClick2 = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { score, assertion } = this.props;
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

        <p
          data-testid="feedback-total-score"
        >
          { score }
        </p>

        <p
          data-testid="feedback-total-question"
        >
          { assertion }
        </p>

        <button
          onClick={ this.handleClick2 }
          type="button"
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}
Feedback.propTypes = {
  history: PropTypes.func.isRequired,
  score: PropTypes.func.isRequired,
  assertion: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertion: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
