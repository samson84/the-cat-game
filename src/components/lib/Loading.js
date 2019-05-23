import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import loadingCat from './cat-loading.gif';
import media from '../media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const LoadingImage = styled.img`
  height: 300px;  
  margin: auto;
  ${media.mobile`height: 200px;`}
`

const LoadingTitle = styled.div`
  font-size: 1.5em;
  margin: -40px auto 0px auto;
`

export default function Loading({title}) {
  return (
    <Container>     
        <LoadingImage src={loadingCat} alt='Loading placeholder.'/>
        <LoadingTitle>{title}</LoadingTitle>
    </Container>
  )
}

Loading.propTypes = {
  title: PropTypes.string,
}

Loading.defaultProps = {
  title: 'Loading...'
}
