import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { playerAction, tokenAction } from '../../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      token: '',
      avatar: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /*   getAvatar = async () => {
    const { saveToken } = this.props;
    const { email } = this.state;
    const hash = md5(email).toString();
    const curr = `https://www.gravatar.com/avatar/${hash}`;
    const response = await fetch(curr);
    const src = response.url;
    this.setState({
      avatar: src,
    });
    saveToken(this.state);
  } */

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { history, saveToken, savePlayer } = this.props;
    const { email } = this.state;
    const curr = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(curr);
    const json = await response.json();
    localStorage.setItem('token', JSON.stringify(json.token));
    const hash = md5(email).toString();
    const curry = `https://www.gravatar.com/avatar/${hash}`;
    const responsy = await fetch(curry);
    const src = responsy.url;
    this.setState({
      token: json.token,
      avatar: src,
    }, () => {
      savePlayer(this.state);
      saveToken(this.state);
      history.push('/playGame');
    });
  }

  render() {
    const regexEmail = /\S+@\S+\.\S+/;
    const { email, name } = this.state;
    const { history } = this.props;
    const validEmail = regexEmail.test(email);
    return (
      <div>
        <label
          htmlFor="login"
        >
          Email:
          <input
            onChange={ this.handleChange }
            value={ email }
            name="email"
            type="email"
            data-testid="input-gravatar-email"
          />
        </label>
        <label
          htmlFor="name"
        >
          Nome:
          <input
            onChange={ this.handleChange }
            value={ name }
            name="name"
            type="text"
            data-testid="input-player-name"
          />
        </label>
        <button
          disabled={ (!validEmail || name.length === 0) }
          onClick={ this.handleClick }
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
        <button
          onClick={ () => { history.push('/config'); } }
          data-testid="btn-settings"
          type="button"
        >
          Configurar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  saveToken: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispacth) => ({
  savePlayer: (payload) => dispacth(playerAction(payload)),
  saveToken: (payload) => dispacth(tokenAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
