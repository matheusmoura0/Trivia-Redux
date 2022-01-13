import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email, src } = this.props;
    console.log(this.props);
    return (
      <>
        <img
          src={ src }
          alt={ src }
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        { email }
        <h2 data-testid="header-score">0</h2>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  src: state.player.imagem,
});

export default connect(mapStateToProps)(Header);
