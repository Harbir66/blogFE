import React from 'react';
import { render } from '@testing-library/react';
import TitleBar from '..';

describe('TitleBar', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<TitleBar />);
    expect(asFragment).toMatchSnapshot();
  });
});
