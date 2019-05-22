import React, {Component} from 'react';
import styled from 'styled-components'

import {getImagesForBreed, AppError} from '../services/catApi';
import Counter from './Counter';
import Loading from './lib/Loading';
import CatImages from './CatImages';
import AnswerButton from './AnswerButtons';
import QuestionStatus from './QuestionStatus';

const TIME_TO_ANSWER_MS = 500000;
const ANSWER_TIMEOUT = -1;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isLoading: false,
      answer: null,
      result: null
    };
  }
  async componentDidMount() {
    await this.getImages()
  }
  async getImages() {
    const {correctId, onError} = this.props;

    this.setState({isLoading: true})
    try {
      const images = await getImagesForBreed(correctId);
      this.setState({
        isLoading: false, 
        images
      })      
    } catch (error) {
      this.setState({isLoading: false})
      onError(error.message)
      if(!(error instanceof AppError)) {
        throw error  
      }      
    }
  }
  answer(answerId) {
    const {onAnswer, correctId} = this.props;
    this.setState({
      answer: answerId,
      result: answerId === ANSWER_TIMEOUT
        ? 'The time is out! Be faster.'
        : answerId === correctId
          ? 'You your answer is correct!'
          : 'Your answer is wrong!'
    })
    onAnswer(answerId===correctId)
  }
  render() {
    const {options, correctId} = this.props;
    const {images, isLoading, answer, result} = this.state;

    const isAnswered = answer !== null;
    const isCorrect = answer === correctId;

    if (isLoading) {
      return (<Loading title='Loading the question...'/>)
    }
    
    return (
      <Container>
        <StatusContainer>
          <QuestionStatus message={result} isSuccess={isCorrect} />
          {
            !isAnswered && 
            <span>
                Time left:
                <Counter
                  timeMs={TIME_TO_ANSWER_MS} 
                  onFinished={() => this.answer(ANSWER_TIMEOUT)}
                />
            </span>            
          }
        </StatusContainer>
        <AnswerButton 
            onAnswer={(userAnswer) => this.answer(userAnswer)}
            options={options}
            correctAnswer={correctId}
            userAnswer={answer}
         />
        <CatImages images={images} />
      </Container>
    )
  }
}