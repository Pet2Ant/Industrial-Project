import React from 'react';
import { ClipLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#4A90E2" loading={true} size={350} />
    </div>
  );
}

export default LoadingSpinner;
