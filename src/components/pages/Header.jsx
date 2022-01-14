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
    const { player } = this.props;
    const MD5 = md5(player.email).toString();

    return (
      <div>
        <p data-testid="header-score">0</p>
        <p data-testid="header-player-name">{player.name}</p>
        <img
          src={ `https://www.gravatar.com/avatar/${MD5}` }
          data-testid="header-profile-picture"
          alt="avatar"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  avatar: PropTypes.function,
  name: PropTypes.function,
}.isRequired;

export default connect(mapStateToProps)(Header);
