import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import happyCat from './cat-face.png';
import sadCat from './crying-cat-face.png'

const CatIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const AnswerIndicator = styled.div`
  height: 32px;
`
const Header = styled.h2`
  margin-right: 1em;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

function GameStatus({currentQuestion, questionNumber, answers}) {
  return (
    <Container>
      <Header>Questions {currentQuestion} of {questionNumber}</Header>
      <AnswerIndicator>
        {
          answers.map((answer, index) => 
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
  answers: PropTypes.arrayOf(PropTypes.number)
}

GameStatus.defaultProps = {
  answers: []
};

export default GameStatus

