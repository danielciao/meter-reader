import React from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import { injectGlobal } from 'styled-components';

import cssReset from './lib/css-reset';
import { H1, H2 } from './components/Heading';
import { Page, Section } from './components/Layout';
import BulbBarChart from './components/BulbBarChart';
import Table, { TableHeader, TableBody, TableCaption, TableRow, CellHeader, CellData } from './components/Table';
import { toFormattedDate, toFormattedDecimal } from './lib/formatter';

// global styles
// eslint-disable-next-line no-unused-expressions
injectGlobal`
 @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400|Roboto:400,700');

  ${cssReset};

  body {
    padding: 0;
    margin: 0;
    font-family: Roboto, Arial, sans-serif;
    color: #333;
    background: #00325c;
  }
`;

export default function App({ data }) {
  if (!data) {
    return <Page>Loading...</Page>;
  }

  const { actual, interpolated } = data;
  return (
    <Page>
      <H1>Your monthly summary</H1>
      <Section>
        <H2>Engergy Usage</H2>
        <BulbBarChart data={actual} />
      </Section>
      <Section>
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
            {actual.map(({ date, energyUsage, unit }) => (
              <TableRow key={date}>
                <CellData>{toFormattedDate(date)}</CellData>
                <CellData>{energyUsage}</CellData>
                <CellData>{unit}</CellData>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>* Orginal reading as provided by customer.</TableCaption>
        </Table>
      </Section>
      <Section>
        <H2>Estimated Usage</H2>
        <BulbBarChart data={interpolated} />
      </Section>
      <Section>
        <H2>Estimated Month End Usage</H2>
        <Table>
          <TableHeader>
            <TableRow>
              <CellHeader>Date</CellHeader>
              <CellHeader>Estimated Usage</CellHeader>
              <CellHeader>Unit</CellHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interpolated.map(({ date, energyUsage, unit }) => (
              <TableRow key={date}>
                <CellData>{toFormattedDate(date)}</CellData>
                <CellData>{toFormattedDecimal(energyUsage)}</CellData>
                <CellData>{unit}</CellData>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>* These are interpolated values from orginal readings.</TableCaption>
        </Table>
      </Section>
    </Page>
  );
}

App.displayName = 'App';
App.propTypes = {
  data: arrayOf(
    shape({
      date: string,
      energyUsage: number,
      unit: string
    })
  ).isRequired
};
