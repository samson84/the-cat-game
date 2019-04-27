import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0.25em;
`;

const Result = styled.span`
  color: ${props => props.isSuccess ? 'forestgreen' : 'red'};
  background: lightgrey;
  padding: 0.25em;
`;

Result.propTypes = {
  isSuccess: PropTypes.bool,
}

function QuestionStatus({message, isSuccess}) {
  return (
    <Container>
      {
        message
          ? <Result isSuccess={isSuccess}>{message}</Result>
          : <div> Quess this cat's breed! </div>
      }
    </Container>
  )
};

QuestionStatus.propTypes = {
  isSuccess: PropTypes.bool,
  message: PropTypes.string
};

export default QuestionStatus;
