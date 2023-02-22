import { render } from '@testing-library/react';
import React from 'react';
import Home from '../Home';

test('renders learn react link', () => {
  const { asFragment } = render(<Home />);
  expect(asFragment).toMatchSnapshot();
});
