import styled from 'styled-components';
import media from '../media';

export const Title = styled.h1`
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  font-size: 3em;
  ${media.mobile`
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    font-size: 2em;
  `}  
`;

export const SubTitle = styled.h2`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 2em;
  ${media.mobile`
    margin-top: 0.10em;
    margin-bottom: 0.25em;
    font-size:1.25em;
  `}

`;

