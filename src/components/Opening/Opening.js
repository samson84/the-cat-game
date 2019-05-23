import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

import cat from './cat_contour.png'
import Button from '../lib/Button'
import media from '../media';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`

const Logo = styled.img`  
  height: 70vh;
  ${media.mobile`height: 60vh;`}
`

const Intro = styled.div`
  border: 2px solid black;
  border-radius: 8px;
  max-width: 300px;
  padding: 1em;
  ${media.mobile`padding: 0.5em`}
  font-size: 1.2em;
`

const P = styled.p`
  margin-top: 0em;
  margin-bottom: 1em;
  ${media.mobile`margin-bottom: 0.5em;`}
`

export default function Opening({onStart}) {
  return (
    <Container>
      <div>
        <Intro>
          <P>
            In this game, you will see 3 pictures of cats of the same breed.
            Quess which breed is on the images. 
          </P> 
          <P>
            You have 10 secs. One game has
            5 questions.
          </P>
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
