import React, { Component } from 'react';
import styled from 'styled-components';

import Game from './components/Game';
import Alert from './components/lib/Alert';
import {Title} from './components/lib/Title';
import media from './components/media';

const Container = styled.div`
  display: flex;
  flex-direction: column; 
`;
const Header = styled.div`
  margin-left: 10em;
  ${media.mobile`margin-left: 0em;`}
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {error: null}
  }
  render() {
    const { error } = this.state

    if(error) {
      return (<Alert>{error}</Alert>)
    }

    return (
      <Container>
        <Header>
          <Title>The Cat Quiz</Title>
        </Header>
        <Content>
          <Game onError={(message) => this.setState({error: message})}/>
        </Content>        
      </Container>
    );
  }
}

export default App;
