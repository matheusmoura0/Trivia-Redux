import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const regexEmail = /\S+@\S+\.\S+/;
    const { email, name } = this.state;
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
          disabled={ !validEmail }
          onClick={ this.handleClick }
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
