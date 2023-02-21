import { render } from '@testing-library/react';
import React from 'react';
import { Header } from '../..';

describe('Header', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment).toMatchSnapshot();
  });
});
