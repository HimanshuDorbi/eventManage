import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-md transform transition-all">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscription Required</h3>
        <p className="text-gray-600 mb-6">
          To create and manage events, you need to subscribe to one of our plans. Each plan offers different features to suit your needs.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/pricing')}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View Plans
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};