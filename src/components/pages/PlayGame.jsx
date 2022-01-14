import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

class PlayGame extends Component {
  constructor() {
    super();

    this.state = {
      played: false,
      question: '',
      arraySortedAlternatives: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { token } = this.props;
    console.log(token);
    const curr = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(curr);
    const questionsObjt = await response.json();
    this.setState({
      question: questionsObjt.results[0],
      played: true,
      arraySortedAlternatives: [questionsObjt.results[0].incorrect_answers, questionsObjt.results[0].correct_answer],
    });
  };

  render() {
    const { question, played, arraySortedAlternatives } = this.state;
    console.log(question, arraySortedAlternatives);
    const magicNumber = 0.4;
    return (
      <div>
        <Header />
        {!played ? null
          : <div>
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
              {arraySortedAlternatives.sort(() => Math.random() - magicNumber).map((el, i) => (
                <button type="button" key={ i } data-testid={ `wrong-answer-${i}` }>{el}</button>
              ))}
              {/* <button type="button" data-testid="correct-answer">{question.correct_answer}</button> */}
            </p>
            </div>}
      </div>
    );
  }
}

/*
As alternativas devem ser exibidas em ordem aleatória
Dica: utilize botões (<button/>) para as alternativas
 */
const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.player.questions,
});

export default connect(mapStateToProps)(PlayGame);
