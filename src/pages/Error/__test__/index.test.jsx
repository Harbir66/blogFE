import { render } from '@testing-library/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Footer } from '../../../components';
import Error from '..';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));
describe('Error page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly without error Code', () => {
    useParams.mockReturnValueOnce({});
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render correctly with error Code', () => {
    useParams.mockReturnValueOnce({ errorCode: '404' });
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });
});
