import styled from 'styled-components';
import { rem } from 'polished';

export const Page = styled.div`
  min-height: 100vh;
  max-width: ${rem(1000)};
  margin: 0 auto;
  padding: ${rem(50)} ${rem(40)};
  background: white;
  box-shadow: ${rem(3)} ${rem(3)} ${rem(20)} 0 #333;
`;

export const Section = styled.section`
  width: 100%;
  margin-bottom: ${rem(30)};
`;
