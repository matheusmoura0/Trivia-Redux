import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { setScore } from '../../actions';

const magicNumber = 0.4;
const ifNumber = 3;
const CORRECT_ANSWER = 'correct-answer';

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
      current: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.timer();
  }

  componentDidUpdate(prevprops, prevstate) {
    const { current } = this.state;
    if (prevstate.current !== current) {
      this.newQuest();
      this.descolorize();
    }
  }

   newQuest = () => {
     const { question, current } = this.state;
     const teste = question[current];
     this.setState({
       arrayAnswers: [...teste.incorrect_answers,
         teste.correct_answer].sort(() => Math.random() - magicNumber),
       disabledbutton: false,
       seconds: 30,
       clicked: false,
     });
     this.timer();
   }

  getQuestions = async () => {
    const { current } = this.state;
    const { token } = this.props;
    const curr = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(curr);
    const questionsObjt = await response.json();
    const qAndA = questionsObjt.results[current];
    this.setState({
      question: questionsObjt.results,
      played: true,
      arrayAnswers: [...qAndA.incorrect_answers,
        qAndA.correct_answer].sort(() => Math.random() - magicNumber),
    });
  };

  diffNumber = () => {
    const { question } = this.state;
    const diff = question.difficulty;
    if (diff === 'medium') return 2;
    if (diff === 'hard') return ifNumber;
    return 1;
  }

  descolorize = () => {
    const buttons = document.querySelectorAll('.buttonAnswer');
    buttons.forEach((button) => {
      const testId = button.getAttribute('data-testid');
      if (testId === CORRECT_ANSWER) {
        button.style.border = '';
      } else {
        button.style.border = '';
      }
    });
  }

   somaPontos = () => {
     const { setScores } = this.props;
     const { seconds } = this.state;
     const points = +'10' + (this.diffNumber() * seconds);
     setScores({ score: points, assertions: 1 });
   }

   stopWatch = (timerzin) => clearInterval(timerzin);

  timer = () => {
    const magicNumbertimer = 1000;
    const timerzin = setInterval(() => {
      const { seconds, clicked } = this.state;
      if (seconds === 0 || clicked) {
        this.setState({
          disabledbutton: true,
        });
        return this.stopWatch(timerzin);
      }
      this.setState({ seconds: seconds - 1 });
    }, magicNumbertimer);
  }

  nextQuestion = () => {
    const { current, question } = this.state;
    const { history } = this.props;
    if (current === question.length - 1) {
      history.push('./feedback');
    } else {
      this.setState({
        current: current + 1,
      });
    }
  }

  colorize(event) {
    this.setState({
      clicked: true,
    });
    const buttons = document.querySelectorAll('.buttonAnswer');
    if (event.target.name === CORRECT_ANSWER) {
      this.somaPontos();
    }
    buttons.forEach((button) => {
      const testId = button.getAttribute('data-testid');
      if (testId === CORRECT_ANSWER) {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
    this.stopWatch();
  }

  render() {
    const { question,
      played,
      arrayAnswers,
      seconds,
      disabledbutton,
      current } = this.state;

    return (
      <div>
        <Header />
        {!played ? null
          : (
            <div>
              <p
                data-testid="question-category"
              >
                {question[current].category}
              </p>
              <p
                data-testid="question-text"
              >
                {question[current].question}
              </p>
              <div
                data-testid="answer-options"
              >
                {arrayAnswers
                  .map((el, i) => (
                    <button
                      name={ el === question[current]
                        .correct_answer ? CORRECT_ANSWER : `wrong-answer-${i}` }
                      disabled={ disabledbutton }
                      className="buttonAnswer"
                      type="button"
                      key={ i }
                      onClick={ (e) => this.colorize(e) }
                      data-testid={ el === question[current]
                        .correct_answer ? CORRECT_ANSWER : `wrong-answer-${i}` }
                    >
                      {el}

                    </button>
                  ))}
              </div>
              <button
                hidden={ !disabledbutton }
                onClick={ this.nextQuestion }
                type="button"
                data-testid="btn-next"
              >
                Next
              </button>
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

const mapDispatchToProps = (dispacth) => ({
  setScores: (payload) => dispacth(setScore(payload)),
});

PlayGame.propTypes = {
  token: PropTypes.func.isRequired,
  setScores: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
