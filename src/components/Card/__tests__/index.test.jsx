import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Card from '..';
import makeRequest from '../../../utils/makeRequest';

const mockProps = {
  id: 1,
  date: '2023-02-01T14:46:22.001Z',
  reading_time: '2 mins',
  title: 'mock title',
  description: 'This is a description.',
  claps: 10,
  liked: false,
  image: 'https://i.ibb.co/LNxt44v/abstract.png',
};
const card = (
  <Card
    id={mockProps.id}
    date={mockProps.date}
    readingTime={mockProps.reading_time}
    title={mockProps.title}
    description={mockProps.description}
    claps={mockProps.claps}
    liked={mockProps.liked}
    image={mockProps.image}
  />
);

jest.mock('../../../utils/makeRequest');

describe('Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const { asFragment } = render(card);
    expect(asFragment).toMatchSnapshot();
  });
  describe('Clapping Icon', () => {
    it('should render the claps with correct number of claps and grey color when rendered for the first time', () => {
      const { container, getByText } = render(card);
      const clapIcon = container.getElementsByClassName('clappings');
      expect(clapIcon.item(0).childNodes[0].src.includes('fill')).toBeFalsy();
      const clapCount = getByText(mockProps.claps);
      expect(clapCount).toBeTruthy();
    });
    it('should increase the claps count and change color to blue when clicked', async () => {
      const { queryByText, container } = render(card);
      const clapCount = queryByText(mockProps.claps);
      const clapIcon = container.getElementsByClassName('clappings');
      expect(clapCount).toBeTruthy();
      expect(clapIcon.item(0).childNodes[0].src.includes('fill')).toBeFalsy();
      act(() => {
        fireEvent.click(clapCount);
      });
      await waitFor(() => {
        expect(queryByText(mockProps.claps + 1)).toBeTruthy();
      });
      expect(clapIcon.item(0).childNodes[0].src.includes('fill')).toBeTruthy();
    });
    it('should decrease the claps count and change color to grey when clicked again', async () => {
      const { queryByText, container } = render(card);
      const clapCount = queryByText(mockProps.claps);
      const clapIcon = container.getElementsByClassName('clappings');
      act(() => {
        fireEvent.click(clapCount);
      });
      await waitFor(() => {
        expect(queryByText(mockProps.claps + 1)).toBeTruthy();
      });
      act(() => {
        fireEvent.click(clapCount);
      });
      await waitFor(() => {
        expect(queryByText(mockProps.claps)).toBeTruthy();
      });
      expect(clapIcon.item(0).childNodes[0].src.includes('fill')).toBeFalsy();
    });
  });
  describe('Heart Icon', () => {
    it('should be rendered with correct color when rendered for the first time', () => {
      const { container } = render(card);
      const heartIcon = container.getElementsByClassName('heart');
      expect(heartIcon.item(0).childNodes[0].src.includes('red')).toBeFalsy();
    });
    it('should change color to red when clicked', async () => {
      const { container } = render(card);
      const heartIcon = container.getElementsByClassName('heart');
      act(() => {
        fireEvent.click(heartIcon.item(0));
      });
      await waitFor(() => {
        expect(
          heartIcon.item(0).childNodes[0].src.includes('red')
        ).toBeTruthy();
      });
    });
    it('should change color to grey when clicked again', async () => {
      const { container } = render(card);
      const heartIcon = container.getElementsByClassName('heart');
      act(() => {
        fireEvent.click(heartIcon.item(0));
      });
      await waitFor(() => {
        expect(heartIcon.item(0).childNodes[0].src.includes('red')).toBeFalsy();
      });
      act(() => {
        fireEvent.click(heartIcon.item(0));
      });
      await waitFor(() => {
        expect(heartIcon.item(0).childNodes[0].src.includes('red')).toBeFalsy();
      });
    });
  });
});
