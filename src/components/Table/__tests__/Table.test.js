import React from 'react';
import renderer from 'react-test-renderer';

import Table, { TableHeader, TableBody, TableCaption, TableRow, CellHeader, CellData } from '../index';

describe('Table', () => {
  it('should render Table correctly', () => {
    const result = renderer
      .create(
        <Table>
          <TableHeader>
            <TableRow>
              <CellHeader>Account Name</CellHeader>
              <CellHeader>Account Type</CellHeader>
              <CellHeader>Balance</CellHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <CellData>Monthly Budget</CellData>
              <CellData>Current</CellData>
              <CellData>350</CellData>
            </TableRow>
            <TableRow>
              <CellData>Holiday Fund</CellData>
              <CellData>Savings</CellData>
              <CellData>1800</CellData>
            </TableRow>
          </TableBody>
          <TableCaption>* Your account summary.</TableCaption>
        </Table>
      )
      .toJSON();

    expect(result).toMatchSnapshot();
  });
});
