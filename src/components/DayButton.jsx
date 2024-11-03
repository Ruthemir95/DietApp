// src/components/DayButton.jsx
import React from 'react';

const DayButton = ({ 
  day, 
  isSelected, 
  isSwapMode, 
  isFirstDay, 
  isSwapped,
  swapInfo,
  onClick 
}) => {
  return (
    <div className="relative group h-full">
      <button
        onClick={onClick}
        className={`
          relative w-full p-2 rounded-lg text-xs font-medium transition-all duration-200
          ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}
          ${isSwapMode && !isFirstDay ? 'hover:bg-yellow-100' : ''}
          ${isFirstDay ? 'bg-yellow-500 text-white' : ''}
          ${isSwapped ? 'border border-yellow-400/50' : ''}
        `}
      >
        {day.slice(0, 3)}
      </button>

      {/* Etichetta dello scambio spostata sotto */}
      {isSwapped && !isSwapMode && swapInfo && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                      text-[11px] font-medium text-yellow-600 uppercase tracking-wider
                      whitespace-nowrap z-20 pt-1">
          ↔ {swapInfo.otherDay.slice(0, 3)}
        </div>
      )}
    </div>
  );
};

export default DayButton;