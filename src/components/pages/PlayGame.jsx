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
      seconds: 0,
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

  onStart=() => {
    this.setState((prevState) => ({
      seconds: prevState + 1,
    }));
  }

  timer = () => {
    console.log('entrou');
    const magicNumber = 1000;
    // const buttons = document.querySelectorAll('.buttonAnswer');
    setInterval(this.onStart, magicNumber);
    // buttons.disabled = false;
  }
  // terminar esta funcao...

  colorize() {
    const buttons = document.querySelectorAll('.buttonAnswer');
    buttons.forEach((button) => {
      const testId = button.getAttribute('data-testid');
      if (testId === 'correct-answer') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  render() {
    const { question, played, arrayAnswers, seconds } = this.state;

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
                      className="buttonAnswer"
                      type="button"
                      key={ i }
                      data-testid={ el === question
                        .correct_answer ? 'correct-answer' : `wrong-answer-${i}` }
                      onClick={ () => this.colorize() }
                    >
                      {el}
                    </button>
                  ))}
                {/* chamar esta funcao junto com o map das alternativas {this.timer()}
 */}
              </p>
              <p
                id="timer"
              >
                Timer:
                {seconds}
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
