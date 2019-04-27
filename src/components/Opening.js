import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

import cat from './cat_contour.png'
import Button from './lib/Button'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`

const Logo = styled.img`
  height: 70vh;
`

const Intro = styled.div`
  border: 2px solid black;
  border-radius: 8px;
  width: 300px;
  padding: 0.5em;
  font-size: 1.2em;
`

export default function Opening(props) {
  const { onStart } = props;

  return (
    <Container>
      <div>
        <Intro>
          <p>
            In this game, you will see 3 pictures of cats from the same breed.
            Quess which breed is on the images. 
          </p> 
          <p>
            You have 5 secs. One game has
            5 questions.
          </p>
        </Intro>
        <Button onClick={ onStart } primary>Start the Game</Button>
      </div>      
      <Logo src={cat} alt='Opening image of a cat contour.'/>
    </Container>
  )
}

Opening.prop_types = {
  onStart: PropTypes.func.isRequired,
}
