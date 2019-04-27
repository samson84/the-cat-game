import React, {Component} from 'react';

import {getImagesForBreed, AppError} from '../services/catApi';
import Counter from './Counter';
import Button from './lib/Button';
import Loading from './lib/Loading';
import CatImages from './CatImages';
import AnswerButton from './AnswerButtons';

const TIME_TO_ANSWER_MS = 5000;
const ANSWER_TIMEOUT = -1;

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
      if(!(error instanceof AppError)) {
        throw error  
      }
      onError(error.message)
    }
  }
  answer(answerId) {
    const {onAnswer, correctId} = this.props;
    this.setState({
      answer: answerId,
      result: answerId === ANSWER_TIMEOUT
        ? 'Timeout'
        : answerId === correctId
          ? 'Correct'
          : 'Wrong'
    })
    onAnswer(answerId===correctId)
  }
  render() {
    const {options, correctId} = this.props;
    const {images, isLoading, answer, result} = this.state;

    if (isLoading) {
      return (<Loading title='Loading the question...'/>)
    }
    
    return (
      <React.Fragment>
        {
          !answer && <div> 
            Quess this cat\'s breed! 
            You have {
              <Counter 
                timeMs={TIME_TO_ANSWER_MS} 
                onFinished={() => this.answer(ANSWER_TIMEOUT)}
              />
            } secs.
          </div>
        }
        <CatImages images={images} />
        <AnswerButton 
          onAnswer={(userAnswer) => this.answer(userAnswer)}
          options={options}
          correctAnswer={correctId}
          userAnswer={answer}
        />
        <div>
          <span style={{color: answer === correctId ? 'green' : 'red'}}>{result}</span>
        </div>
      </React.Fragment>
    )
  }
}