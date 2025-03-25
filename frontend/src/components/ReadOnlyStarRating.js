import React from 'react';
import '../styles/StarRating.css'; // You can separate styles for clarity!

const ReadOnlyStarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<span key={i} className="star_ full">★</span>);
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(<span key={i} className="star_ half">★</span>);
    } else {
      // Empty star
      stars.push(<span key={i} className="star_">★</span>);
    }
  }

  return <div className="starRating">{stars}</div>;
};

export default ReadOnlyStarRating;
