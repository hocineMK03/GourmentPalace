import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ onChange, initialRating }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleClick = (newRating) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <FaStar
          key={index}
          size={24}
          color={index <= rating ? '#ffc107' : '#e4e5e9'}
          onClick={() => handleClick(index)}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

export default Rating;
