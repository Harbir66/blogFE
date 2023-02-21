import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Card from '..';

const mockProps = {
  date: '1 January 2023',
  readingTime: '2 min',
  title: 'Title',
  description: 'this is description',
  claps: 23,
  liked: false,
  image: `${process.env.PUBLIC_URL}/Images/abstract.png`,
};
const card = (
  <Card
    date={mockProps.date}
    readingTime={mockProps.readingTime}
    title={mockProps.title}
    description={mockProps.description}
    claps={mockProps.claps}
    liked={mockProps.liked}
    image={mockProps.image}
  />
);

describe('Card', () => {
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
    it('should increase the claps count and change color to blue when clicked', () => {
      const { queryByText, container } = render(card);
      const clapCount = queryByText(mockProps.claps);
      const clapIcon = container.getElementsByClassName('clappings');
      expect(clapCount).toBeTruthy();
      expect(clapIcon.item(0).childNodes[0].src.includes('fill')).toBeFalsy();
      fireEvent.click(clapCount);
      expect(queryByText(mockProps.claps + 1)).toBeTruthy();
      expect(clapIcon.item(0).childNodes[0].src.includes('fill')).toBeTruthy();
    });
    it('should decrease the claps count and change color to grey when clicked again', () => {
      const { queryByText, container } = render(card);
      const clapCount = queryByText(mockProps.claps);
      const clapIcon = container.getElementsByClassName('clappings');
      fireEvent.click(clapCount);
      fireEvent.click(clapCount);
      expect(queryByText(mockProps.claps)).toBeTruthy();
      expect(clapIcon.item(0).childNodes[0].src.includes('fill')).toBeFalsy();
    });
  });
  describe('Heart Icon', () => {
    it('should be rendered with correct color when rendered for the first time', () => {
      const { container } = render(card);
      const heartIcon = container.getElementsByClassName('heart');
      expect(heartIcon.item(0).childNodes[0].src.includes('red')).toBeFalsy();
    });
    it('should change color to red when clicked', () => {
      const { container } = render(card);
      const heartIcon = container.getElementsByClassName('heart');
      fireEvent.click(heartIcon.item(0));
      expect(heartIcon.item(0).childNodes[0].src.includes('red')).toBeTruthy();
    });
    it('should change color to grey when clicked again', () => {
      const { container } = render(card);
      const heartIcon = container.getElementsByClassName('heart');
      fireEvent.click(heartIcon.item(0));
      fireEvent.click(heartIcon.item(0));
      expect(heartIcon.item(0).childNodes[0].src.includes('red')).toBeFalsy();
    });
  });
});
