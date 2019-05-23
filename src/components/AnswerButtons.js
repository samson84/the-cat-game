import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './lib/Button'

const Container = styled.div`
`;

function AnswerButtons({onAnswer, options, userAnswer, correctAnswer}) {
  const isAnswered = userAnswer !== null;
  const isCorrect = userAnswer === correctAnswer

  return (
    <Container>
      {options.map((breed) => (
        <Button 
          onClick={() => onAnswer(breed.id)}
          disabled={isAnswered}
          error={isAnswered && !isCorrect && userAnswer === breed.id}
          success={
            isAnswered && (breed.id === correctAnswer)
          }
          key={breed.id}
        >
          {breed.name}
        </Button>
      ))}
    </Container>
  )
};

AnswerButtons.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })),
  correctAnswer: PropTypes.oneOfType([PropTypes.string]),
  userAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AnswerButtons.defaultProps = {
  options: [],
  correctAnswer: null,
  userAnswer: null
};

export default AnswerButtons;

