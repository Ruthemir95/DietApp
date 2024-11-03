import React from 'react';
import { Flame, Beef, Wheat, Droplets } from 'lucide-react';

const NutritionSummary = ({ nutrition, className = '' }) => {
  return (
    <div className={`grid grid-cols-4 gap-2 p-2 bg-white rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col items-center">
        <Flame className="h-4 w-4 text-red-500 mb-1" />
        <span className="text-xs text-gray-600">Kcal</span>
        <span className="font-semibold">{nutrition?.calories || 0}</span>
      </div>
      <div className="flex flex-col items-center">
        <Beef className="h-4 w-4 text-purple-500 mb-1" />
        <span className="text-xs text-gray-600">P</span>
        <span className="font-semibold">{nutrition?.protein || 0}g</span>
      </div>
      <div className="flex flex-col items-center">
        <Wheat className="h-4 w-4 text-yellow-500 mb-1" />
        <span className="text-xs text-gray-600">C</span>
        <span className="font-semibold">{nutrition?.carbs || 0}g</span>
      </div>
      <div className="flex flex-col items-center">
        <Droplets className="h-4 w-4 text-blue-500 mb-1" />
        <span className="text-xs text-gray-600">G</span>
        <span className="font-semibold">{nutrition?.fat || 0}g</span>
      </div>
    </div>
  );
};

export default NutritionSummary;