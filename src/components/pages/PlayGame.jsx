import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

const magicNumber = 0.4;

class PlayGame extends Component {
  constructor() {
    super();

    this.state = {
      played: false,
      question: '',
      arrayAnswers: [],
      seconds: 30,
      disabledbutton: false,
      clicked: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.timer();
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
        qAndA.correct_answer].sort(() => Math.random() - magicNumber),
    });
  };

  timer = () => {
    const magicNumbertimer = 1000;
    const timerzin = setInterval(() => {
      const { seconds, clicked } = this.state;
      if (seconds === 0 || clicked === true) {
        this.setState({
          disabledbutton: true,
        });
        this.colorize();
        return clearInterval(timerzin);
      }
      this.setState({ seconds: seconds - 1 });
    }, magicNumbertimer);
  }

  colorize() {
    const buttons = document.querySelectorAll('.buttonAnswer');
    this.setState({
      clicked: true,
    });
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
    const { question, played, arrayAnswers, seconds, disabledbutton } = this.state;

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
                  .map((el, i) => (
                    <button
                      disabled={ disabledbutton }
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
