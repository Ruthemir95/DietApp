const DayButton = ({ 
  day, 
  isSelected, 
  isSwapMode, 
  isFirstDay, 
  onClick 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full h-9 text-xs font-medium flex items-center justify-center rounded-lg transition-all duration-200 ${
        isSelected 
          ? 'bg-blue-500 text-white' 
          : isFirstDay
          ? 'bg-yellow-200 text-gray-800'
          : 'bg-white text-gray-800 hover:bg-gray-100'
      } ${
        isSwapMode 
          ? 'relative border-2 border-dashed border-gray-300'
          : 'border border-gray-200'
      }`}
    >
      {day.slice(0, 3)}
      {isSwapMode && isFirstDay && (
        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          1°
        </span>
      )}
    </button>
  );
};

export default DayButton;