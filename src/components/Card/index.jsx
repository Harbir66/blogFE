import { React, useState } from 'react';
import './Card.css';
import PropTypes from 'prop-types';
import clapWhiteIcon from '../../assets/Icons/clapping.svg';
import clapFillIcon from '../../assets/Icons/clapping-fill.svg';
import heartWhiteIcon from '../../assets/Icons/heart-black.svg';
import heartRedIcon from '../../assets/Icons/heart-red.svg';
import { UPDATE_BLOG_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import { getFormattedDateFromUtcDate } from '../../utils/common';

function Card({
  id,
  date,
  readingTime,
  title,
  description,
  claps,
  liked,
  image,
}) {
  const [heart, setHeart] = useState(liked);
  const [clapCount, setClapCount] = useState(claps);
  const [clap, setClap] = useState(false);

  const handleClaps = async () => {
    try {
      if (!clap) {
        await makeRequest(UPDATE_BLOG_DATA(id), {
          data: {
            claps: clapCount + 1,
          },
        });
        setClapCount(clapCount + 1);
        setClap(!clap);
      } else {
        await makeRequest(UPDATE_BLOG_DATA(id), {
          data: {
            claps: clapCount - 1,
          },
        });
        setClapCount(clapCount - 1);
        setClap(!clap);
      }
    } catch (err) {
      //
    }
  };

  const handleHeart = async () => {
    try {
      await makeRequest(UPDATE_BLOG_DATA(id), {
        data: {
          liked: !heart,
        },
      });
      setHeart(!heart);
    } catch (err) {
      //
    }
  };

  const heartIcon = heart ? heartRedIcon : heartWhiteIcon;
  const cardImage = image;
  const clapIcon = clap ? clapFillIcon : clapWhiteIcon;
  const formattedDate = getFormattedDateFromUtcDate(date);
  return (
    <div className="card">
      <img src={cardImage} alt="" />
      <div className="card-info-container">
        <div className="card-details">
          <div className="date">{formattedDate}</div>
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
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  claps: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
};
