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
    const { name, avatar } = this.props;
    console.log(avatar);

    return (
      <div>
        <h2 data-testid="header-score">0</h2>
        <h3 data-testid="header-player-name">{name}</h3>
        <img
          src={ avatar }
          alt={ avatar }
          data-testid="header-profile-picture"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  avatar: state.player.avatar,
});

Header.propTypes = {
  avatar: PropTypes.function,
  name: PropTypes.function,
}.isRequired;

export default connect(mapStateToProps)(Header);
