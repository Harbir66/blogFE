/* eslint-disable camelcase */
import React from 'react';
import './CardContainer.css';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';
import { GET_BLOG_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import { BlogPostContext } from '../../contexts/CardContext';

function CardContainer() {
  const { allBlogsData, setAllBlogsData } = React.useContext(BlogPostContext);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    makeRequest(GET_BLOG_DATA, {}, navigate)
      .then((data) => {
        setAllBlogsData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="padding">
        <p>{error}</p>
      </div>
    );
  }

  const cards = allBlogsData ? (
    allBlogsData.map((cardInfo) => {
      return <Card key={cardInfo.id} blogData={cardInfo} />;
    })
  ) : (
    <div data-testid="loading" className="padding">
      <p>Loading...</p>
    </div>
  );
  return <main className="padding">{cards}</main>;
}

export default CardContainer;
