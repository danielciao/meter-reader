import React from 'react';
import renderer from 'react-test-renderer';

import { H1, H2 } from '../index';

describe('Heading', () => {
  it('should render h1 correctly', () => {
    const result = renderer.create(<H1>This is a heading</H1>).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('should render h2 correctly', () => {
    const result = renderer.create(<H2>This is a heading</H2>).toJSON();

    expect(result).toMatchSnapshot();
  });
});
