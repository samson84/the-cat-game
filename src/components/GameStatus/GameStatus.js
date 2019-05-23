import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import happyCat from './cat-face.png';
import sadCat from './crying-cat-face.png'
import {SubTitle} from '../lib/Title';
import media from '../media';

const CatIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const AnswerIndicator = styled.div``

const Header = styled.div`
  margin-right: 1em;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

function GameStatus({currentQuestion, questionNumber, answers, showAnswers}) {
  return (
    <Container>
      <Header>
        <SubTitle>
          Questions {currentQuestion} of {questionNumber}
        </SubTitle>        
      </Header>
      <AnswerIndicator>
        {
          showAnswers && answers.map((answer, index) => 
            <CatIcon
              key={index}
              src={answer ? happyCat : sadCat} 
              alt={answer ? 'Correct answer' : 'Wrong answer'} 
            />
          )
        }
      </AnswerIndicator>
    </Container>
  )
}

GameStatus.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  answers: PropTypes.arrayOf(PropTypes.number),
  showAnswers: PropTypes.bool
}

GameStatus.defaultProps = {
  answers: []
};

export default GameStatus

