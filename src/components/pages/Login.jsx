import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import React from 'react';
import { connect } from 'react-redux';
import { tokenAction } from '../../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      token: '',
      imagem: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { history, saveToken } = this.props;
    const curr = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(curr);
    const json = await response.json();
    localStorage.setItem('token', JSON.stringify(json.token));

    const { email } = this.state;
    const hash = md5(email).toString();
    const curre = `https://www.gravatar.com/avatar/${hash}`;
    const responses = await fetch(curre);
    const jsons = await responses;
    const src = jsons.url;

    this.setState({
      token: json.token,
      imagem: src,
    });
    history.push('/playGame');
    saveToken(this.state);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
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
  saveToken: (payload) => dispacth(tokenAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
