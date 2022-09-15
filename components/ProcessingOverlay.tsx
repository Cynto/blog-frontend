import React from 'react';
import ReactLoading from 'react-loading';

const ProcessingOverlay = ({ processing }: { processing: boolean }) => {
  return processing ? (
    <div className="fixed w-full h-full flex justify-center items-center bg-gray-800 opacity-60 z-10 ">
      <ReactLoading type="spin" color="#fff" />
    </div>
  ) : null;
};

export default ProcessingOverlay;
