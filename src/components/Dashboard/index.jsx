import React, { Fragment } from 'react';

import { H2 } from '../Heading';
import BulbBarChart from '../BulbBarChart';
import Table, { TableHeader, TableBody, TableCaption, TableRow, CellHeader, CellData } from '../Table';

export default function Dashboard({ data }) {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <H2>Energy Usage</H2>
      <BulbBarChart data={data} />
      <H2>Meter Readings</H2>
      <Table>
        <TableHeader>
          <TableRow>
            <CellHeader>Date</CellHeader>
            <CellHeader>Reading</CellHeader>
            <CellHeader>Unit</CellHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ date, energyUsage, unit }) => (
            <TableRow key={date}>
              <CellData>{date}</CellData>
              <CellData>{energyUsage}</CellData>
              <CellData>{unit}</CellData>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>* Orginal reading as provided by customer.</TableCaption>
      </Table>
    </Fragment>
  );
}
