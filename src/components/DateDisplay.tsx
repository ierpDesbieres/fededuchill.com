import React from 'react';

const DateDisplay = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="text-lg text-gray-500 dark:text-gray-400 mb-8">
      {currentDate}
    </div>
  );
};

export default DateDisplay;
