import React from 'react';
import renderer from 'react-test-renderer';

import { Page, Section } from '../index';

describe('Layout', () => {
  it('should render Page correctly', () => {
    const result = renderer.create(<Page />).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('should render Section correctly', () => {
    const result = renderer.create(<Section />).toJSON();

    expect(result).toMatchSnapshot();
  });
});
