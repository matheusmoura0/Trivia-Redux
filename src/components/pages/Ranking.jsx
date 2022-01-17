import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <p
          data-testid="ranking-title"
        />
        RANKING
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-go-home"
        >
          Go home
        </button>
        <ul>
          {Object.values(localStorage).map((score, index) => (
            <div key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${md5(JSON.parse(score).email).toString()}` }
                alt="player"
              />
              <p data-testid={ `player-score-${index}` }>{JSON.parse(score).scores}</p>
              <p data-testid={ `player-name-${index}` }>{ JSON.parse(score).name }</p>
            </div>
          )).sort((a, b) => JSON.parse(a).scores - JSON.parse(b).scores)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = () => ({
});

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
