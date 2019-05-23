import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import without from 'lodash/without';
import styled from 'styled-components'

import {getAllBreeds, AppError} from '../services/catApi';
import {getRandomElements, range, shuffle} from '../utils/random';
import Question from './Question';
import Button from './lib/Button';
import Opening from './Opening/Opening';
import Loading from './lib/Loading';
import GameStatus from './GameStatus/GameStatus';
import media from '../components/media';

const QUESTION_NUMBER = 5;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Centered = styled.div`
  margin: auto;
`

const StatusBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`

export default class Game extends Component {
	constructor(props) {
    super(props)
    this.state = {
      breeds: [],
      questions: [],
      answers: [],
      currentQuestion: null,
      isLoading: false
    }
    this.createGame = this.createGame.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.answer = this.answer.bind(this);
  }
  async componentDidMount() {
    const { onError } = this.props

    this.setState({isLoading: true, hasError: false})
    try {
      const breeds = await getAllBreeds()
      this.setState({breeds, isLoading: false})
    } catch (error) {   
      this.setState({isLoading: false, hasError: true})   
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
      hasError
    } = this.state;
    const { onError } = this.props;

    if (isLoading) {
      return (<Loading title='Loading game...' />)
    }

    if (hasError) {
      return null;
    }

    if (currentQuestion === null) {
      return (
        <Container>
          <Centered>
            <Opening onStart={this.createGame}/>
          </Centered>
        </Container>        
      )
    }
    
    const question = questions[currentQuestion]
    const isAnswered = currentQuestion === answers.length - 1
    const isLastQuestion = currentQuestion === QUESTION_NUMBER - 1

    return ( 
      <Container>
        <Centered>
          <StatusBar>
            <GameStatus 
              currentQuestion={currentQuestion + 1}
              questionNumber={QUESTION_NUMBER}
              answers={answers}
              showAnswers={isAnswered}
            />
            {
              isAnswered && !isLastQuestion &&
                <Button 
                  onClick={this.nextQuestion} 
                  primary
                >
                  Next Question
                </Button>
            }
            {
              isAnswered && isLastQuestion &&
                <Button 
                  onClick={this.createGame}
                  primary
                >
                  New Game
                </Button>
            }
            {isAnswered && isLastQuestion && <span>The game finished.</span>}
          </StatusBar>
          <Question 
            options={question.breeds}
            correctId={question.correctId}
            onError={(message) => onError(message)}
            onAnswer={this.answer}
            key={currentQuestion}
          /> 
        </Centered>
      </Container>
    )
  }
}

Game.propTypes = {
  onError: PropTypes.func.isRequired,
}
