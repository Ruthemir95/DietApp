import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, Edit2 } from 'lucide-react';

const Toast = ({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 3000,
  action = null 
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };

  const bgColors = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    info: 'bg-blue-50'
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${bgColors[type]} z-50`}>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-3">
          {icons[type]}
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="flex items-center space-x-2">
          {action && (
            <button
              onClick={action.onClick}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-600"
              title={action.label}
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;