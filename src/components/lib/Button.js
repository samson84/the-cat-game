import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

const Button = styled.button`
  background: transparent;
  border: 2px solid black;
  border-radius: 6px;
  margin: 0.25em 0.5em;
  padding: 0.25em 1em;
  color: black;
  font-size: 1.2em;

  ${(props) => (
    props.primary && css`
      background: black;
      color: white;      
    `    
  )}
  ${(props) => (
    props.error && css`
      color: red;
      border-color: red;
    `    
  )}
  ${(props) => (
    props.success && css`
      color: green;
      border-color: green;
    `    
  )}
  :disabled {
    opacity: 0.5;
  }
`
Button.propTypes = {
  primary: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool
}
export default Button

const StyledCloseButton = styled.button`
  opacity: 1;
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.5em;
`

export const CloseButton = (props) => <StyledCloseButton {...props}>×</StyledCloseButton>
