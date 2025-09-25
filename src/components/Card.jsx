import React from 'react';

const Card = ({ children, className = '', onClick, ...props }) => {
  const baseClasses = 'bg-white rounded-lg shadow-md border border-gray-200';
  const combinedClasses = `${baseClasses} ${className}`;

  if (onClick) {
    return (
      <div
        className={`${combinedClasses} cursor-pointer`}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
