import React from 'react';

const ImageSkeletonLoader: React.FC = () => {
  return (
    <div className="w-full h-48 bg-gray-700/50 animate-pulse"></div>
  );
};

export default ImageSkeletonLoader;