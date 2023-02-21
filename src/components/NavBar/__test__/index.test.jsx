import React from 'react';
import { render } from '@testing-library/react';
import NavBar from '..';

describe('NavBar', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<NavBar />);
    expect(asFragment).toMatchSnapshot();
  });
});
