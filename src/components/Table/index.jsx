import styled from 'styled-components';
import { rem } from 'polished';

export default styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeader = styled.thead`
  th:not(:last-of-type) {
    border-right: solid 1px white;
  }
`;

export const TableBody = styled.tbody``;

export const TableCaption = styled.caption`
  caption-side: bottom;
  padding: ${rem(10)} ${rem(20)};
  text-align: left;
  font-style: italic;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #cbd5df;
  }
`;

export const CellHeader = styled.th`
  color: white;
  background: #00325c;
  font-weight: 600;
  padding: ${rem(10)} ${rem(20)};
`;

export const CellData = styled.td`
  padding: ${rem(10)} ${rem(20)};
`;
