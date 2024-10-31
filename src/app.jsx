import React, { useState } from "react";
import {
  Coffee,
  Apple,
  UtensilsCrossed,
  Cookie,
  ChefHat,
  Info,
  ArrowLeftRight,
  Flame,
  Beef,
  Droplets, // cambiato da Drop a Droplets
  Wheat,
  Upload,
  Trash2,
  Edit2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import Papa from "papaparse";
import UserSelector from "./components/UserSelector";
import MealEditor from "./components/MealEditor";
import DayButton from './components/DayButton';
import NutritionSummary from './components/NutritionSummary';
import { nutritionData, calculateTotalNutrition } from './data/nutritionData';
import MealSection from './components/MealSection';

const mealPlan = {
  LUNEDÌ: {
    Colazione: [
      "Latte di vacca parzial. scremato: 200g",
      "Cereali Integrali: 40g",
      "Gocce di cioccolato fondente-Perugina: 10g",
    ],
    "Spuntino Matt.": [
      "Ananas: 150g",
      "Mandorle dolci - secche: 15g",
      ["Alternative frutta: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Pranzo: [
      "Pasta di semola integrale: 80g",
      "Pesto: 30g",
      "Tonno: 100g",
      "Olio di oliva extra vergine: 10g",
    ],
    Merenda: [
      "Ananas: 150g",
      ["Alternative: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Cena: [
      "Frittata: 120g",
      "Fiori di zucca: 100g",
      "Olio di oliva extra vergine: 10g",
      [
        "Alternative verdure: Funghi champignon, Melanzane, Peperoni, Radicchio rosso, Zucchine",
      ],
    ],
  },
  MARTEDÌ: {
    Colazione: [
      "Yogurt greco 0% aromatizzato: 150g",
      "Biscotti integrali: 30g",
      "Mandorle dolci - secche: 15g",
    ],
    "Spuntino Matt.": [
      "Ananas: 150g",
      "Cioccolato fondente 85%: 20g",
      ["Alternative frutta: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Pranzo: [
      "Pasta di semola integrale: 80g",
      "Lenticchie secche: 60g",
      "Zucca: 100g",
      "Olio di oliva extra vergine: 10g",
    ],
    Merenda: [
      "Ananas: 150g",
      ["Alternative: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Cena: [
      "Pesce spada: 200g",
      "Verdure fresche (media): 200g",
      "Olio di oliva extra vergine: 10g",
      ["Alternative pesce: Tonno, Merluzzo, Orata surgelata"],
    ],
  },
  MERCOLEDÌ: {
    Colazione: [
      "Latte di vacca parzial. scremato: 200g",
      "Pane integrale: 60g",
      "Protein cream haselnuss - nutella proteica: 10g",
    ],
    "Spuntino Matt.": [
      "Ananas: 150g",
      "Parmareggio Snack: 20g",
      ["Alternative frutta: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Pranzo: [
      "Pasta di semola integrale: 80g",
      "Pesce spada: 100g",
      "Melanzane: 150g",
      "Olio di oliva extra vergine: 10g",
    ],
    Merenda: [
      "Ananas: 150g",
      ["Alternative: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Cena: [
      "Bresaola: 100g",
      "Verdure fresche (media): 200g",
      "Olio di oliva extra vergine: 10g",
      "Frisella: 50g",
      [
        "Alternative proteine: Mozzarella di vacca (120g), Fiocchi di latte (150g)",
      ],
    ],
  },
  GIOVEDÌ: {
    Colazione: [
      "Yogurt greco 0% aromatizzato: 150g",
      "Mandorle dolci - secche: 15g",
      "Lamponi: 50g",
      ["Alternative frutta: Mirtilli (50g)"],
    ],
    "Spuntino Matt.": ["Cioccolato fondente 85%: 20g"],
    Pranzo: [
      "Pasta di semola integrale: 80g",
      "Piselli: 80g",
      "Carciofi: 150g",
      "Parmigiano grattugiato: 10g",
      "Olio di oliva extra vergine: 10g",
      ["Alternative verdure: Funghi champignon, Zucchine"],
    ],
    Merenda: [
      "Ananas: 150g",
      ["Alternative: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Cena: [
      "Frittata: 120g",
      "Fiori di zucca: 100g",
      "Olio di oliva extra vergine: 10g",
      [
        "Alternative verdure: Funghi champignon, Melanzane, Peperoni, Radicchio rosso, Zucchine",
      ],
    ],
  },
  VENERDÌ: {
    Colazione: [
      "Latte di vacca parzial. scremato: 200g",
      "Cereali Integrali: 40g",
      "Gocce di cioccolato fondente-Perugina: 10g",
    ],
    "Spuntino Matt.": [
      "Ananas: 150g",
      "Mandorle dolci - secche: 15g",
      ["Alternative frutta: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Pranzo: [
      "Pasta di semola integrale: 80g",
      "Minestrone di verdure: 200g",
      "Parmigiano Reggiano Grattugiato: 10g",
      "Olio di oliva extra vergine: 10g",
      ["Alternative pasta: Crostini Integrali (50g), Patate (180g)"],
    ],
    Merenda: [
      "Ananas: 150g",
      ["Alternative: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Cena: [
      "Pesce spada: 200g",
      "Verdure fresche (media): 200g",
      "Olio di oliva extra vergine: 10g",
      "Frisella: 50g",
    ],
  },
  SABATO: {
    Colazione: [
      "Yogurt greco 0% aromatizzato: 150g",
      "Biscotti integrali: 30g",
      "Mandorle dolci - secche: 15g",
    ],
    "Spuntino Matt.": [
      "Ananas: 150g",
      "Cioccolato fondente 85%: 20g",
      ["Alternative frutta: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Pranzo: [
      "Pasta di semola integrale: 80g",
      "Prosciutto cotto: 60g",
      "Funghi coltivati champignon: 150g",
      "Olio di oliva extra vergine: 10g",
      ["Alternative: Scamorza (50g), Zucchine (200g)"],
    ],
    Merenda: [
      "Ananas: 150g",
      ["Alternative: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Cena: [
      "Cena Libera",
    ],
  },
  DOMENICA: {
    Colazione: [
      "Latte di vacca parzial. scremato: 200g",
      "Pane integrale: 60g",
      "Protein cream haselnuss - nutella proteica: 10g",
    ],
    "Spuntino Matt.": [
      "Ananas: 150g",
      "Parmareggio Snack: 20g",
      ["Alternative frutta: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Pranzo: [
      "Pranzo Libero",
    ],
    Merenda: [
      "Ananas: 150g",
      ["Alternative: Arancia, Kiwi, Mela, Pera, Prugne (150g)"],
    ],
    Cena: [
      "Pesce spada: 200g",
      "Verdure fresche (media): 200g",
      "Olio di oliva extra vergine: 10g",
      "Frisella: 50g",
    ],
  },
};

const mealIcons = {
  Colazione: <Coffee className="h-5 w-5" />,
  "Spuntino Matt.": <Apple className="h-5 w-5" />,
  Pranzo: <UtensilsCrossed className="h-5 w-5" />,
  Merenda: <Cookie className="h-5 w-5" />,
  Cena: <ChefHat className="h-5 w-5" />,
};

const App = () => {
  // Funzione per ottenere il giorno corrente
  const getCurrentDay = () => {
    const days = {
      0: 'DOMENICA',
      1: 'LUNEDÌ',
      2: 'MARTEDÌ',
      3: 'MERCOLEDÌ',
      4: 'GIOVEDÌ',
      5: 'VENERDÌ',
      6: 'SABATO'
    };
    return days[new Date().getDay()];
  };

  // Funzione per il saluto
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Buongiorno";
    if (hour >= 12 && hour < 18) return "Buon pomeriggio";
    return "Buonasera";
  };

  // Stati
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [isSwapMode, setIsSwapMode] = useState(false);
  const [firstDayToSwap, setFirstDayToSwap] = useState(null);
  const [swappedDays, setSwappedDays] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [users, setUsers] = useState([
    { id: 'danilo', name: 'Danilo', plan: mealPlan }
  ]);
  const [currentUser, setCurrentUser] = useState('danilo');
  const [originalMealPlan] = useState({...mealPlan});

  // Handler per lo scambio giorni
  const handleDaySwap = (day) => {
    if (!firstDayToSwap) {
      setFirstDayToSwap(day);
    } else {
      const updatedMealPlan = { ...mealPlan };
      const temp = updatedMealPlan[firstDayToSwap];
      updatedMealPlan[firstDayToSwap] = updatedMealPlan[day];
      updatedMealPlan[day] = temp;
      Object.assign(mealPlan, updatedMealPlan);
      
      setSwappedDays(prev => [...prev, {
        day1: firstDayToSwap,
        day2: day,
        date: new Date().toLocaleDateString()
      }]);
      
      setFirstDayToSwap(null);
      setIsSwapMode(false);
    }
  };

  // Handler per il reset
  const handleReset = () => {
    Object.assign(mealPlan, originalMealPlan);
    setSwappedDays([]);
    setSelectedDay(getCurrentDay());
  };

  // Handler per il caricamento di nuovi piani
  const handleNewPlanUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Per ora solo un alert di demo
    alert('Funzionalità in sviluppo: ' + file.name);
  };

  // Handler per la modifica dei pasti
  const handleMealEdit = (meal, items) => {
    setEditingMeal({ meal, items });
  };

  const handleMealSave = (editedItems) => {
    const updatedPlan = { ...mealPlan };
    updatedPlan[selectedDay][editingMeal.meal] = editedItems;
    Object.assign(mealPlan, updatedPlan);
    setEditingMeal(null);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Logo Header */}
      <div className="flex items-center justify-center mb-3">
        <img
          src={`${import.meta.env.BASE_URL}/images/plate-logo.png`}
          alt="Plate Logo" 
          className="h-16 w-16 mr-2"
        />
        <h1 className="text-2xl font-bold text-slate-700">PLATE</h1>
      </div>

      {/* Saluto personalizzato */}
      <Card className="mb-6">
        <CardHeader className="py-3 px-4">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-700">
              {getGreeting()}, {currentUser} 👋
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('it-IT', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Selettore Utente */}
      <UserSelector 
        currentUser={currentUser}
        users={users}
        onUserChange={setCurrentUser}
        onNewPlanUpload={handleNewPlanUpload}
      />

      {/* Aggiunta del componente NutritionSummary */}
      <NutritionSummary 
        nutrition={calculateTotalNutrition(mealPlan[selectedDay])} // Passa i valori nutrizionali totali
      />

      {/* Controlli per i giorni */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={handleReset}
            className="flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
          >
            <span className="text-sm">Ripristina Piano</span>
          </button>
          
          <button
            onClick={() => {
              setIsSwapMode(!isSwapMode);
              setFirstDayToSwap(null);
            }}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              isSwapMode
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span className="text-sm">
              {isSwapMode ? "Annulla Scambio" : "Scambia Giorni"}
            </span>
          </button>
        </div>

        {/* Lista degli scambi effettuati */}
        {swappedDays.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">
              Giorni Scambiati:
            </h3>
            <ul className="space-y-1">
              {swappedDays.map((swap, index) => (
                <li key={index} className="text-xs text-yellow-700">
                  {swap.day1} ↔ {swap.day2} ({swap.date})
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-7 gap-1">
          {Object.keys(mealPlan).map((day) => (
            <DayButton 
              key={day} 
              day={day}
              isSelected={selectedDay === day}
              isSwapMode={isSwapMode}
              isFirstDay={firstDayToSwap === day}
              onClick={() => isSwapMode ? handleDaySwap(day) : setSelectedDay(day)}
            />
          ))}
        </div>

        {isSwapMode && (
          <div className="mt-2 text-sm text-center text-gray-600">
            {!firstDayToSwap
              ? "Seleziona il primo giorno da scambiare"
              : "Ora seleziona il secondo giorno per completare lo scambio"}
          </div>
        )}
      </div>

      {/* Sezioni pasti */}
      <div className="space-y-4">
        {Object.entries(mealPlan[selectedDay]).map(([meal, items]) => (
          <div key={meal} className="relative">
            <button
              onClick={() => handleMealEdit(meal, items)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 z-10"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <MealSection 
              title={meal} 
              items={items}
              mealIcons={mealIcons}
              nutritionData={nutritionData}
            />
          </div>
        ))}
      </div>

      {/* Editor dei pasti */}
      {editingMeal && (
        <MealEditor
          meal={editingMeal.meal}
          items={editingMeal.items}
          onSave={handleMealSave}
          onCancel={() => setEditingMeal(null)}
        />
      )}
    </div>
  );
};

export default App;