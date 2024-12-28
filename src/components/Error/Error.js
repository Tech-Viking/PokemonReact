import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="text-red-500 text-center">
      <p>Error: {message}</p>
    </div>
  );
};

export default Error;