import { React, useState } from 'react';
import './Card.css';
import PropTypes from 'prop-types';

function Card({ date, readingTime, title, description, claps, liked, image }) {
  const [heart, setHeart] = useState(liked);
  const [clapCount, setClapCount] = useState(claps);
  const [clap, setClap] = useState(false);

  const handleClaps = () => {
    if (!clap) {
      setClapCount(clapCount + 1);
      setClap(!clap);
    } else {
      setClapCount(clapCount - 1);
      setClap(!clap);
    }
  };

  const handleHeart = () => {
    setHeart(!heart);
  };

  const heartIcon = heart
    ? `${process.env.PUBLIC_URL}/Icons/heart-red.svg`
    : `${process.env.PUBLIC_URL}/Icons/heart-black.svg`;
  const cardImage = `${process.env.PUBLIC_URL}/Images/${image}`;
  const clapIcon = clap
    ? `${process.env.PUBLIC_URL}/Icons/clapping-fill.svg`
    : `${process.env.PUBLIC_URL}/Icons/clapping.svg`;

  return (
    <div className="card">
      <img src={cardImage} alt="" />
      <div className="card-info-container">
        <div className="card-details">
          <div className="date">{date}</div>
          <div className="reading-time">{readingTime}</div>
        </div>
        <div className="card-title">{title}</div>
        <div className="card-description">{description}</div>
        <hr />
        <div className="card-reactions">
          <button
            type="button"
            className="clappings"
            onClick={handleClaps}
            style={{ color: clap ? '#127996' : '#5e5e5e' }}
          >
            <img src={clapIcon} alt="clappings-icon" />
            {clapCount}
          </button>
          <button className="heart" type="button" onClick={handleHeart}>
            <img src={heartIcon} alt="heart-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  claps: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
};
