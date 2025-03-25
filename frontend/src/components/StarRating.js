import React, { useState } from 'react';
import '../styles/StarRating.css';

const StarRating = ({ rating, onChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const displayRating = hoveredRating ?? rating;

  const handleClick = (e, i) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const clickValue = x < width / 2 ? i - 0.5 : i;
    onChange(clickValue);
  };
  

  const handleMouseMove = (e, i) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const hoverValue = x < width / 2 ? i - 0.5 : i;
    setHoveredRating(hoverValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const full = i <= displayRating;
      const half = displayRating >= i - 0.5 && displayRating < i;

      stars.push(
        <span
          key={i}
          className={`star ${full ? 'full' : half ? 'half' : ''}`}
          onClick={(e) => handleClick(e, i)}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return <div className="starRating">{renderStars()}</div>;
};

export default StarRating;

