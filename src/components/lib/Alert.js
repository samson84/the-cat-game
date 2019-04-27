import React, { Component } from 'react';
import styled from 'styled-components'
import {CloseButton} from './Button'

const StyledAlert = styled.div`
background: pink;
  border: 2px solid red;
  border-radius: 4px;
  margin: auto 0px;
  padding: 0.25em 0em 0.25em 0.25em;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`

export default class Alert extends Component {
  static propTypes = {}
  constructor(props) {
    super(props)
    this.state = {isOpen: true}
  }
  render() {
    return (
      <React.Fragment>
        { this.state.isOpen &&
          <StyledAlert>
            <Content>{this.props.children}</Content>
            <CloseButton onClick={() => this.setState({isOpen: false})} />
          </StyledAlert>  
        }
      </React.Fragment>
    )
  }
}

