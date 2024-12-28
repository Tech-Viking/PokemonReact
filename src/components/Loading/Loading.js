import React from 'react';

const Loading = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className='ml-2'>Cargando ...</span>
     </div>
    );
  };
export default Loading;