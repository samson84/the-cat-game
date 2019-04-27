import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import without from 'lodash/without';
import styled from 'styled-components'

import {getAllBreeds, AppError} from '../services/catApi';
import {getRandomElements, range, shuffle} from '../utils/random';
import Question from './Question';
import Button from './lib/Button';
import Opening from './Opening';
import Loading from './lib/Loading';

const QUESTION_NUMBER = 5;

const Container = styled.div`
`

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
    }
    this.createGame = this.createGame.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.answer = this.answer.bind(this);
  }
  async componentDidMount() {
    const { onError } = this.props

    this.setState({isLoading: true})
    try {
      const breeds = await getAllBreeds()
      this.setState({breeds, isLoading: false})
    } catch (error) {      
      if(!(error instanceof AppError)) {
        throw error  
      }
      onError(error.message)
    }
  }
  createGame() {
    const {breeds} = this.state;
    const breedIndexes = range(breeds.length)
    const questions = getRandomElements(breedIndexes, QUESTION_NUMBER).map((breedIndex) => {
      const correctId = breeds[breedIndex].id;
      const remaining = without(breedIndexes, breedIndex)
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
      isLoading, 
      currentQuestion, 
      questions,
      answers,
    } = this.state;

    if (isLoading) {
      return (<Loading />)
    }

    if (currentQuestion === null) {
      return (
        <Container>
          <Opening onStart={this.createGame}/>
        </Container>        
      )
    }
    
    const question = questions[currentQuestion]
    const isAnswered = currentQuestion === answers.length - 1
    const isLastQuestion = currentQuestion === QUESTION_NUMBER - 1

    return ( 
      <Container>
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
              ? <Button onClick={this.createGame} primary>New Game</Button>
              : <Button onClick={this.nextQuestion} primary>Next Question</Button>
            : null
        }
      </Container>
    )
  }
}

Game.propTypes = {
  onError: PropTypes.func.isRequired,
}
