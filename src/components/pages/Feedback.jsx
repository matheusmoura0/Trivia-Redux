import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

// import Header from './Header';

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
    const { score, assertion, player } = this.props;
    const MD5 = md5(player.email).toString();
    return (
      <div
        data-testid="feedback-text"
      >
        <img
          src={ `https://www.gravatar.com/avatar/${MD5}` }
          data-testid="header-profile-picture"
          alt="avatarPlayer"
        />

        {/* <Header /> */}
        <p data-testid="feedback-text">
          {assertion < +'3'
            ? 'Could be better...'
            : 'Well Done!'}

        </p>
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
  player: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  score: state.player.score,
  assertion: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
