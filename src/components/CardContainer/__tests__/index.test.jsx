import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import CardContainer from '..';
import makeRequest from '../../../utils/makeRequest';

const mockData = [
  {
    id: 1,
    date: '2020-10-10T00:00:00.000Z',
    reading_time: '5 mins',
    title: 'Mock Title 1',
    description: 'This is a description',
    claps: 10,
    liked: false,
    image: 'https://i.ibb.co/LNxt44v/abstract.png',
  },
  {
    id: 2,
    date: '2020-10-10T00:00:00.000Z',
    reading_time: '5 mins',
    title: 'Mock Title 2',
    description: 'This is a description',
    claps: 10,
    liked: false,
    image: 'https://i.ibb.co/LNxt44v/abstract.png',
  },
];

jest.mock('../../../utils/makeRequest');
describe('CardContainer', () => {
  it('should render correctly', async () => {
    makeRequest.mockResolvedValue(mockData);
    const { asFragment } = render(<CardContainer />);
    await waitFor(() => {
      expect(screen.getByText('Mock Title 1')).toBeInTheDocument();
    });
    expect(asFragment).toMatchSnapshot();
  });
  it('should display error message when some error occurs', async () => {
    makeRequest.mockRejectedValue({ message: 'Error' });
    const { asFragment } = render(<CardContainer />);
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
    expect(asFragment).toMatchSnapshot();
  });
  it('should display loading message when data is being fetched', async () => {
    makeRequest.mockResolvedValue(mockData);
    render(<CardContainer />);
    expect(screen.getByText('Loading...')).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByText('Mock Title 1')).toBeTruthy();
    });
  });
});
