import { render } from '@testing-library/react';
import React from 'react';
import PageNotFound from '..';

describe('Not Found Page', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<PageNotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
