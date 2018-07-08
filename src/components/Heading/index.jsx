import styled from 'styled-components';
import { rem } from 'polished';

export const H1 = styled.h1`
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: ${rem(52)};
  font-weight: 300;
  padding-bottom: ${rem(20)};
  margin-bottom: ${rem(50)};
  border-bottom: solid 1px #ea0080;
`;

export const H2 = styled.h2`
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: ${rem(26)};
  padding-bottom: ${rem(20)};
  margin-bottom: ${rem(20)};
`;
