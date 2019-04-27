import React, {Component} from 'react';
import {getAllBreeds, AppError} from '../services/catApi';
import {getRandomElements, range, shuffle} from '../utils/random';
import cloneDeep from 'lodash/cloneDeep';
import Question from './Question';

const QUESTION_NUMBER = 5;

export default class Game extends Component {
	constructor(props) {
    super(props)
    this.state = {
      breeds: [],
      questions: [],
      answers: [],
      currentQuestion: null,
      isLoading: false,
      isImagesLoading: false,
      error: null,
    }
    this.createGame = this.createGame.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.answer = this.answer.bind(this);
  }
  async componentDidMount() {
    this.setState({isLoading: true, error: null})
    try {
      const breeds = await getAllBreeds()
      this.setState({breeds, isLoading: false})
    } catch (error) {      
      if(!(error instanceof AppError)) {
        throw error  
      }      
      this.setState({isLoading: false, error: error.message})      
    }
  }
  createGame() {
    const {breeds} = this.state;
    const breedIndexes = range(breeds.length)
    const questions = getRandomElements(breedIndexes, QUESTION_NUMBER).map((breedIndex) => {
      const correctId = breeds[breedIndex].id;
      const remaining = [
        ...breedIndexes.slice(breedIndex-1),
        ...breedIndexes.slice(breedIndex+1)
      ]
      const wrongIds = getRandomElements(remaining, 2)
      const questionBreeds = [breedIndex, ...wrongIds].map(id => cloneDeep(breeds[id]))
      return {        
        breeds: shuffle(questionBreeds),
        correctId,
      }
    })
    this.setState({questions, currentQuestion: 0, answers: []})
  }
  nextQuestion() {
    this.setState(
      prevState => ({currentQuestion: prevState.currentQuestion + 1})
    )    
  }
  answer(isSuccess) {
    this.setState((prevState) => (
      {answers: [...prevState.answers, isSuccess]}
    ))
  }
  render() {
    const {
      error, 
      isLoading, 
      currentQuestion, 
      questions,
      answers,
    } = this.state;

    if (error) {
      return (<span style={{color: 'red'}}>{error}</span>)
    }

    if (isLoading) {
      return (<span>Loading...</span>)
    }

    if (currentQuestion === null) {
      return (
        <React.Fragment>          
          <button onClick={this.createGame}>Start Game</button>          
        </React.Fragment>
        
      )
    }
    
    const question = questions[currentQuestion]
    const isAnswered = currentQuestion === answers.length - 1
    const isLastQuestion = currentQuestion === QUESTION_NUMBER - 1

    return ( 
      <React.Fragment>
        <div>
          Questions: {currentQuestion + 1}/{QUESTION_NUMBER}
          Correct: {answers.reduce((prev, current) => current ? prev + 1 :prev, 0)}          
        </div>
        <div>{isLastQuestion && isAnswered && 'Game finshed'}</div>        
        <Question 
          options={question.breeds}
          correctId={question.correctId}
          onError={(message) => this.setState({error: message})}
          onAnswer={this.answer}
          key={currentQuestion}
        /> 
        {
          isAnswered
            ? isLastQuestion
              ? <button onClick={this.createGame}>New Game</button>
              : <button onClick={this.nextQuestion}>Next Question</button>
            : null
        }

      </React.Fragment>
    )
  }
}