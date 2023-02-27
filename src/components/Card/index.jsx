import React, { useContext } from 'react';
import './Card.css';
import PropTypes from 'prop-types';
import clapWhiteIcon from '../../assets/Icons/clapping.svg';
import heartWhiteIcon from '../../assets/Icons/heart-black.svg';
import heartRedIcon from '../../assets/Icons/heart-red.svg';
import { UPDATE_BLOG_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import {
  getFormattedDateFromUtcDate,
  updateBlogData,
} from '../../utils/common';
import { BlogPostContext } from '../../contexts/CardContext';

function Card({ blogData }) {
  const { allBlogsData, setAllBlogsData } = useContext(BlogPostContext);

  const handleClaps = async () => {
    if (allBlogsData) {
      try {
        await makeRequest(UPDATE_BLOG_DATA(blogData.id), {
          data: {
            claps: blogData.claps + 1,
          },
        });
        updateBlogData(
          {
            ...blogData,
            claps: blogData.claps + 1,
          },
          allBlogsData,
          setAllBlogsData
        );
      } catch (err) {
        //
      }
    }
  };

  const handleHeart = async () => {
    if (allBlogsData) {
      try {
        await makeRequest(UPDATE_BLOG_DATA(blogData.id), {
          data: {
            liked: !blogData.liked,
          },
        });
        updateBlogData(
          {
            ...blogData,
            liked: !blogData.liked,
          },
          allBlogsData,
          setAllBlogsData
        );
      } catch (err) {
        //
      }
    }
  };

  const heartIcon = blogData.liked ? heartRedIcon : heartWhiteIcon;
  const cardImage = blogData.image;
  const clapIcon = clapWhiteIcon;
  const formattedDate = getFormattedDateFromUtcDate(blogData.date);

  return (
    <div className="card">
      <img src={cardImage} alt="" />
      <div className="card-info-container">
        <div className="card-details">
          <div className="date">{formattedDate}</div>
          <div className="reading-time">{blogData.reading_time}</div>
        </div>
        <div className="card-title">{blogData.title}</div>
        <div className="card-description">{blogData.description}</div>
        <hr />
        <div className="card-reactions">
          <button type="button" className="clappings" onClick={handleClaps}>
            <img src={clapIcon} alt="clappings-icon" />
            {blogData.claps}
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
  blogData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    reading_time: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    claps: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
