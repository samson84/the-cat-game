import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const CatImage = styled.img`
  object-fit: cover;
  object-position: 50% 50%;
  margin: 0.25em;
`;

function CatImages({images, width, height}) {
  return (
    <Container>
      {images.map(
        (image, index) => 
          <CatImage 
            src={image} 
            alt='A cat' 
            height={width} 
            width={height}
            key={index}
          />
      )}
    </Container>
  )
}

CatImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.number,
  height: PropTypes.number,
}

CatImages.defaultProps = {
  images: [],
  width: 300,
  height: 300
}

export default CatImages

