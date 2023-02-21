import React from 'react';
import './CardContainer.css';
// import { Card } from '..';
import Card from '../Card';
import cardData from '../../mockData/index.json';

function CardContainer() {
  const cards = cardData.map((cardInfo) => {
    const { date, readingTime, title, description, claps, liked, image } =
      cardInfo;
    return (
      <Card
        key={title}
        date={date}
        readingTime={readingTime}
        title={title}
        description={description}
        claps={claps}
        liked={liked}
        image={image}
      />
    );
  });
  return <main className="padding">{cards}</main>;
}

export default CardContainer;
