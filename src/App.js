import React, { Component } from 'react';
import styled from 'styled-components';

import Game from './components/Game';
import Alert from './components/lib/Alert';

const Container = styled.div`
  display: flex;
  flex-direction: column; 
`;
const Header = styled.div``;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.h1``;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {error: null}
  }
  render() {
    const { error } = this.state

    return (
      <Container>
        <Header>
          <Title>The cat quiz</Title>
          {error && <Alert>{error}</Alert>}
        </Header>
        <Content>
          <Game onError={(message) => this.setState({error: message})}/>
        </Content>        
      </Container>
    );
  }
}

export default App;
