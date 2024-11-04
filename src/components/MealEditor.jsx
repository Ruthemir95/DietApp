import React, { useState, useEffect } from 'react';
import { Plus, X, Info, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import NutritionSummary from './NutritionSummary';
import { calculateNutrition } from '../utils/nutritionParser';

const MealEditor = ({ 
  meal, 
  items = [], 
  nutritionData = {}, 
  onSave, 
  onCancel 
}) => {
  // Stati locali
  const [editedItems, setEditedItems] = useState(items);
  const [newItemText, setNewItemText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');

  // Calcola i valori nutrizionali totali
  const totalNutrition = calculateNutrition(editedItems);

  // Gestisce la ricerca di suggerimenti
  useEffect(() => {
    if (newItemText.length < 2) {
      setSuggestions([]);
      return;
    }

    const searchTerm = newItemText.toLowerCase();
    const matches = Object.entries(nutritionData)
      .filter(([name]) => name.toLowerCase().includes(searchTerm))
      .slice(0, 5)
      .map(([name, nutrition]) => ({
        name,
        nutrition
      }));

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  }, [newItemText, nutritionData]);

  // Gestisce l'aggiunta di un nuovo item
  const handleAddItem = (item, nutrition) => {
    setEditedItems(prev => [...prev, { 
      item, 
      nutrition,
      id: Date.now() // Identificatore unico per l'item
    }]);
    setNewItemText('');
    setSuggestions([]);
    setShowSuggestions(false);
    setError('');
  };

  // Gestisce la rimozione di un item
  const handleRemoveItem = (index) => {
    setEditedItems(prev => prev.filter((_, i) => i !== index));
  };

  // Gestisce il salvataggio
  const handleSave = () => {
    if (editedItems.length === 0) {
      setError('Aggiungi almeno un alimento prima di salvare');
      return;
    }
    onSave(editedItems);
  };

  const formatNutritionValue = (value) => {
    // Arrotonda a 1 decimale e converti in stringa
    return Number(value).toFixed(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Modifica {meal}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Input per nuovo alimento */}
          <div className="relative">
            <div className="flex gap-2">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Aggiungi un alimento..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => handleAddItem(newItemText, null)}
                disabled={!newItemText.trim()}
                className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* Suggerimenti */}
            {showSuggestions && (
              <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-lg border">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddItem(suggestion.name, suggestion.nutrition)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>{suggestion.name}</span>
                    <NutritionSummary nutrition={suggestion.nutrition} size="small" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lista items */}
          <ul className="space-y-2">
            {editedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-2">
                <div className="flex-1 mr-4">{item.item}</div>
                
                {/* Layout migliorato per i valori nutrizionali */}
                <div className="flex space-x-3 items-center">
                  <div className="flex flex-col items-center min-w-[45px]">
                    <span className="text-xs text-gray-500">Kcal</span>
                    <span className="text-sm">{formatNutritionValue(item.nutrition?.calories || 0)}</span>
                  </div>
                  <div className="flex flex-col items-center min-w-[45px]">
                    <span className="text-xs text-gray-500">P</span>
                    <span className="text-sm">{formatNutritionValue(item.nutrition?.protein || 0)}</span>
                  </div>
                  <div className="flex flex-col items-center min-w-[45px]">
                    <span className="text-xs text-gray-500">C</span>
                    <span className="text-sm">{formatNutritionValue(item.nutrition?.carbs || 0)}</span>
                  </div>
                  <div className="flex flex-col items-center min-w-[45px]">
                    <span className="text-xs text-gray-500">G</span>
                    <span className="text-sm">{formatNutritionValue(item.nutrition?.fat || 0)}</span>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </ul>

          {/* Messaggio di errore */}
          {error && (
            <div className="flex items-center space-x-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Pulsanti azioni */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              Salva
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealEditor;