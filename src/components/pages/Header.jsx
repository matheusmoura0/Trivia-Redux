import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

  render() {
    const { name, email } = this.props;
    return (
      <div>
        <img
          src={}
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        { email }
        <h2 data-testid="header-score">0</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
