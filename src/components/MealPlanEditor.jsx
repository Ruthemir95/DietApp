// src/components/MealPlanEditor.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const MealPlanEditor = ({ 
  onSave, 
  onCancel, 
  initialPlan = null,
  nutritionData = {},
  isEditing = false
}) => {
  const [currentDay, setCurrentDay] = useState('LUNEDÌ');
  const [currentMeal, setCurrentMeal] = useState('Colazione');
  const [newFood, setNewFood] = useState({
    name: '',
    quantity: '',
    nutrition: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    }
  });
  const [plan, setPlan] = useState(() => {
    if (initialPlan) {
      return JSON.parse(JSON.stringify(initialPlan)); // Deep copy
    }
    return {
      'LUNEDÌ': {},
      'MARTEDÌ': {},
      'MERCOLEDÌ': {},
      'GIOVEDÌ': {},
      'VENERDÌ': {},
      'SABATO': {},
      'DOMENICA': {}
    };
  });

  const days = ['LUNEDÌ', 'MARTEDÌ', 'MERCOLEDÌ', 'GIOVEDÌ', 'VENERDÌ', 'SABATO', 'DOMENICA'];
  const meals = ['Colazione', 'Spuntino Matt.', 'Pranzo', 'Merenda', 'Cena'];

  useEffect(() => {
    // Inizializza la struttura dei pasti per ogni giorno
    const updatedPlan = { ...plan };
    days.forEach(day => {
      if (!updatedPlan[day]) {
        updatedPlan[day] = {};
      }
      meals.forEach(meal => {
        if (!updatedPlan[day][meal]) {
          updatedPlan[day][meal] = [];
        }
      });
    });
    setPlan(updatedPlan);
  }, []);

  const handleFoodNameChange = (name) => {
    setNewFood(prev => {
      const foodNutrition = nutritionData[name] || {
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      };
      return {
        ...prev,
        name,
        nutrition: foodNutrition
      };
    });
  };

  const addFood = () => {
    if (!newFood.name.trim()) return; // Verifica che il nome non sia vuoto

    setPlan(prev => {
      const updatedPlan = { ...prev };
      if (!updatedPlan[currentDay][currentMeal]) {
        updatedPlan[currentDay][currentMeal] = [];
      }

      const foodItem = {
        item: `${newFood.name}${newFood.quantity ? `: ${newFood.quantity}` : ''}`,
        nutrition: newFood.nutrition
      };

      updatedPlan[currentDay][currentMeal].push(foodItem); // Aggiungi il nuovo alimento

      return updatedPlan;
    });

    // Reset del form
    setNewFood({
      name: '',
      quantity: '',
      nutrition: {
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      }
    });
  };

  const addAlternative = (alternative) => {
    if (!alternative.trim()) return; // Verifica che l'alternativa non sia vuota

    setPlan(prev => {
      const updatedPlan = { ...prev };
      if (!updatedPlan[currentDay][currentMeal]) {
        updatedPlan[currentDay][currentMeal] = [];
      }
      
      updatedPlan[currentDay][currentMeal].push([alternative]); // Aggiungi l'alternativa
      return updatedPlan;
    });
  };

  const removeFood = (day, meal, index) => {
    setPlan(prev => {
      const updatedPlan = { ...prev };
      updatedPlan[day][meal] = updatedPlan[day][meal].filter((_, i) => i !== index); // Rimuovi l'alimento
      return updatedPlan;
    });
  };

  const handleSave = () => {
    // Verifica che ci siano pasti inseriti
    const hasMeals = Object.values(plan).some(day => 
      Object.values(day).some(meal => meal.length > 0)
    );

    if (!hasMeals) {
      alert('Inserisci almeno un pasto prima di salvare il piano.');
      return;
    }

    onSave(plan); // Salva il piano
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{isEditing ? 'Modifica Piano' : 'Nuovo Piano'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Selettori */}
            <div className="grid grid-cols-2 gap-4">
              <select
                value={currentDay}
                onChange={(e) => setCurrentDay(e.target.value)}
                className="px-3 py-2 rounded-lg border"
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              <select
                value={currentMeal}
                onChange={(e) => setCurrentMeal(e.target.value)}
                className="px-3 py-2 rounded-lg border"
              >
                {meals.map(meal => (
                  <option key={meal} value={meal}>{meal}</option>
                ))}
              </select>
            </div>

            {/* Form aggiunta alimento */}
            <div className="space-y-2">
              <input
                id="food-name"
                name="food-name"
                className="px-3 py-2 rounded-lg border"
                placeholder="Nome alimento"
                value={newFood.name}
                onChange={(e) => handleFoodNameChange(e.target.value)}
                list="foodsList"
              />
              <datalist id="foodsList">
                {Object.keys(nutritionData).map(food => (
                  <option key={food} value={food} />
                ))}
              </datalist>

              <div className="grid grid-cols-2 gap-2">
                <input
                  id="food-quantity"
                  name="food-quantity"
                  className="px-3 py-2 rounded-lg border"
                  placeholder="Quantità (es: 100g)"
                  value={newFood.quantity}
                  onChange={(e) => setNewFood(prev => ({...prev, quantity: e.target.value}))}
                />
                
                <button
                  onClick={addFood}
                  className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi
                </button>
              </div>

              {/* Info nutrizionali */}
              <div className="grid grid-cols-4 gap-2">
                <input
                  id="calories"
                  name="calories"
                  className="px-3 py-2 rounded-lg border"
                  placeholder="Calorie"
                  type="number"
                  value={newFood.nutrition.calories}
                  onChange={(e) => setNewFood(prev => ({
                    ...prev,
                    nutrition: {...prev.nutrition, calories: e.target.value}
                  }))}
                />
                <input
                  id="protein"
                  name="protein"
                  className="px-3 py-2 rounded-lg border"
                  placeholder="Proteine (g)"
                  type="number"
                  value={newFood.nutrition.protein}
                  onChange={(e) => setNewFood(prev => ({
                    ...prev,
                    nutrition: {...prev.nutrition, protein: e.target.value}
                  }))}
                />
                <input
                  id="carbs"
                  name="carbs"
                  className="px-3 py-2 rounded-lg border"
                  placeholder="Carb (g)"
                  type="number"
                  value={newFood.nutrition.carbs}
                  onChange={(e) => setNewFood(prev => ({
                    ...prev,
                    nutrition: {...prev.nutrition, carbs: e.target.value}
                  }))}
                />
                <input
                  id="fat"
                  name="fat"
                  className="px-3 py-2 rounded-lg border"
                  placeholder="Grassi (g)"
                  type="number"
                  value={newFood.nutrition.fat}
                  onChange={(e) => setNewFood(prev => ({
                    ...prev,
                    nutrition: {...prev.nutrition, fat: e.target.value}
                  }))}
                />
              </div>
            </div>

            {/* Alternative */}
            <div>
              <input
                className="w-full px-3 py-2 rounded-lg border"
                placeholder="Aggiungi alternativa (es: 'o Mela, Pera (150g)')"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addAlternative(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>

            {/* Lista alimenti correnti */}
            <div className="mt-4 border rounded-lg p-4">
              <h3 className="font-medium mb-2">{currentDay} - {currentMeal}</h3>
              <ul className="space-y-1">
                {plan[currentDay]?.[currentMeal]?.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{Array.isArray(item) ? item[0] : item.item}</span>
                    <button
                      onClick={() => removeFood(currentDay, currentMeal, index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Azioni */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Annulla
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Save className="h-4 w-4 mr-2 inline" />
              Salva Piano
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlanEditor;