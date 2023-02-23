/* eslint-disable camelcase */
import React from 'react';
import './CardContainer.css';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';
import { GET_BLOG_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';

function CardContainer() {
  const [cardData, setCardData] = React.useState();
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    makeRequest(GET_BLOG_DATA, {}, navigate)
      .then((data) => {
        setCardData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const cards = cardData ? (
    cardData.map((cardInfo) => {
      const {
        id,
        date,
        reading_time,
        title,
        description,
        claps,
        liked,
        image,
      } = cardInfo;
      return (
        <Card
          key={id}
          id={id}
          date={date}
          readingTime={reading_time}
          title={title}
          description={description}
          claps={claps}
          liked={liked}
          image={image}
        />
      );
    })
  ) : (
    <div data-testid="loading">
      <p>Loading...</p>
    </div>
  );
  return <main className="padding">{cards}</main>;
}

export default CardContainer;
