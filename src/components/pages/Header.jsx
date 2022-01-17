import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { player, score, assertion } = this.props;
    const MD5 = md5(player.email).toString();

    return (
      <div>
        <p data-testid="header-player-name">
          Player:
          {' '}
          {player.name}
        </p>
        <p data-testid="header-score">
          {score}
        </p>
        <p data-testid="feedback-text">
          {assertion < +'3'
            ? 'Could be better...'
            : 'Well Done!'}

        </p>
        <img
          src={ `https://www.gravatar.com/avatar/${MD5}` }
          data-testid="header-profile-picture"
          alt="avatarPlayer"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  score: state.player.score,
  assertion: state.player.assertions,
});

Header.propTypes = {
  avatar: PropTypes.function,
  name: PropTypes.function,
}.isRequired;

export default connect(mapStateToProps)(Header);
