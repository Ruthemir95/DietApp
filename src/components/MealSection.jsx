// src/components/MealSection.jsx
import React from 'react';
import { Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import NutritionSummary from './NutritionSummary';
import { calculateNutrition } from '../utils/nutritionParser';

const MealSection = ({ 
  title, 
  items, 
  mealIcons 
}) => {
  const nutrition = calculateNutrition(items);
  
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          {mealIcons[title]}
          <CardTitle className="text-lg font-semibold text-primary">
            {title}
          </CardTitle>
        </div>
        <NutritionSummary nutrition={nutrition} />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => {
            // Se è un'alternativa
            if (item.alternative) {
              return (
                <div key={index} className="mt-2 pl-4 py-2 bg-gray-50 rounded-lg border-l-4 border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{item.alternative}</span>
                  </div>
                </div>
              );
            }

            // Se è un alimento normale
            const displayText = item.item;
            const itemNutrition = item.nutrition;

            return (
              <li key={index} className="text-sm flex items-center justify-between pl-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  <span>{displayText}</span>
                </div>
                {itemNutrition && (
                  <span className="text-xs text-gray-500">
                    {itemNutrition.calories} kcal
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MealSection;