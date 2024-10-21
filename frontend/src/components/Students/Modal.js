import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold text-center text-green-600">Applied Successfully!</h2>
        <p className="text-center text-gray-600 mt-2">Thank you for your application. We will review it and get back to you soon.</p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
