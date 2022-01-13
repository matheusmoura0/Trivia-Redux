import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayGame extends Component {
  render() {
    const { token } = this.props;

    return (
      <div>
        Play
        {token}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
});

PlayGame.propTypes = {
  token: PropTypes.function,
}.isRequired;

export default connect(mapStateToProps)(PlayGame);
