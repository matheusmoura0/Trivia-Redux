import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      src: '',
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    console.log(email);
    console.log(hash);
    const curr = `https://www.gravatar.com/avatar/${hash}`;
    const response = await fetch(curr);
    const json = await response;
    const src = json.url;
    this.setState({ src });
  }

  render() {
    const { name } = this.props;
    const { src } = this.state;
    return (
      <div>
        <img
          src={ src }
          alt={ src }
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
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
