import React from 'react';
import { render } from '@testing-library/react';
import CardContainer from '..';

describe('CardContainer', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<CardContainer />);
    expect(asFragment).toMatchSnapshot();
  });
});
