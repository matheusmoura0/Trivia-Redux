import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class PlayGame extends Component {
  constructor() {
    super();

    this.state = {
      played: false,
      question: '',
      arrayAnswers: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { token } = this.props;
    const curr = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(curr);
    const questionsObjt = await response.json();
    const qAndA = questionsObjt.results[0];
    this.setState({
      question: qAndA,
      played: true,
      arrayAnswers: [...qAndA.incorrect_answers,
        qAndA.correct_answer],
    });
  };

  render() {
    const { question, played, arrayAnswers } = this.state;
    console.log(arrayAnswers);
    console.log(question);

    const magicNumber = 0.4;
    return (
      <div>
        <Header />
        {!played ? null
          : (
            <div>
              <p
                data-testid="question-category"
              >
                {question.category}
              </p>
              <p
                data-testid="question-text"
              >
                {question.question}
              </p>
              <p
                data-testid="answer-options"
              >
                {arrayAnswers
                  .sort(() => Math
                    .random() - magicNumber)
                  .map((el, i) => (
                    <button
                      type="button"
                      key={ i }
                      data-testid={ el === question.correct_answer ? 'correct-answer' : `wrong-answer-${i}` }
                    >
                      {el}
                    </button>
                  ))}
              </p>
            </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.player.questions,
});

PlayGame.propTypes = {
  token: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PlayGame);
