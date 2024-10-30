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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

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

const nutritionData = {
  // Latticini
  "Latte di vacca parzial. scremato": {
    calories: 46,
    protein: 3.3,
    carbs: 5.0,
    fat: 1.5,
    per: 100,
  },
  "Yogurt greco 0% aromatizzato": {
    calories: 57,
    protein: 10,
    carbs: 3.6,
    fat: 0,
    per: 100,
  },
  "Parmigiano grattugiato": {
    calories: 392,
    protein: 33,
    carbs: 0,
    fat: 29,
    per: 100,
  },
  "Parmigiano Reggiano Grattugiato": {
    calories: 392,
    protein: 33,
    carbs: 0,
    fat: 29,
    per: 100,
  },
  "Mozzarella di vacca": {
    calories: 280,
    protein: 18,
    carbs: 0,
    fat: 22.5,
    per: 100,
  },
  "Fiocchi di latte": {
    calories: 98,
    protein: 11,
    carbs: 3.5,
    fat: 4.3,
    per: 100,
  },
  "Parmareggio Snack": {
    calories: 392,
    protein: 33,
    carbs: 0,
    fat: 29,
    per: 100,
  },
  Scamorza: { calories: 280, protein: 20, carbs: 0, fat: 22, per: 100 },

  // Cereali e derivati
  "Cereali Integrali": {
    calories: 340,
    protein: 8.5,
    carbs: 71,
    fat: 2.5,
    per: 100,
  },
  "Pasta di semola integrale": {
    calories: 350,
    protein: 13,
    carbs: 70,
    fat: 2,
    per: 100,
  },
  "Pane integrale": {
    calories: 250,
    protein: 8,
    carbs: 49,
    fat: 1.5,
    per: 100,
  },
  Frisella: { calories: 350, protein: 11, carbs: 73, fat: 1.5, per: 100 },
  "Biscotti integrali": {
    calories: 420,
    protein: 8,
    carbs: 75,
    fat: 12,
    per: 100,
  },
  "Crostini Integrali": {
    calories: 400,
    protein: 11,
    carbs: 80,
    fat: 4,
    per: 100,
  },

  // Proteine
  Tonno: { calories: 130, protein: 29, carbs: 0, fat: 1, per: 100 },
  "Tonno sott'olio - sgocciolato": {
    calories: 190,
    protein: 25,
    carbs: 0,
    fat: 10,
    per: 100,
  },
  "Pesce spada": { calories: 144, protein: 23, carbs: 0, fat: 5.8, per: 100 },
  Bresaola: { calories: 150, protein: 32, carbs: 0, fat: 2.5, per: 100 },
  "Prosciutto cotto": {
    calories: 145,
    protein: 22,
    carbs: 0,
    fat: 6,
    per: 100,
  },
  "Merluzzo o nasello surgelato": {
    calories: 82,
    protein: 18,
    carbs: 0,
    fat: 0.8,
    per: 100,
  },
  "Orata surgelata": { calories: 100, protein: 20, carbs: 0, fat: 2, per: 100 },

  // Legumi
  "Lenticchie secche": {
    calories: 325,
    protein: 25,
    carbs: 54,
    fat: 1.8,
    per: 100,
  },
  Piselli: { calories: 81, protein: 5.4, carbs: 14, fat: 0.4, per: 100 },

  // Frutta e verdura
  Ananas: { calories: 50, protein: 0.5, carbs: 12, fat: 0, per: 100 },
  Arancia: { calories: 47, protein: 0.9, carbs: 12, fat: 0.2, per: 100 },
  Kiwi: { calories: 61, protein: 1.1, carbs: 15, fat: 0.5, per: 100 },
  Mela: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, per: 100 },
  Pera: { calories: 57, protein: 0.4, carbs: 15, fat: 0.1, per: 100 },
  Prugne: { calories: 46, protein: 0.7, carbs: 11, fat: 0.3, per: 100 },
  Lamponi: { calories: 52, protein: 1.2, carbs: 12, fat: 0.7, per: 100 },
  Mirtilli: { calories: 57, protein: 0.7, carbs: 14, fat: 0.3, per: 100 },

  "Fiori di zucca": {
    calories: 15,
    protein: 1.1,
    carbs: 3.3,
    fat: 0.1,
    per: 100,
  },
  "Funghi coltivati champignon": {
    calories: 22,
    protein: 3.1,
    carbs: 3.3,
    fat: 0.3,
    per: 100,
  },
  Melanzane: { calories: 25, protein: 1.1, carbs: 5.7, fat: 0.2, per: 100 },
  Peperoni: { calories: 20, protein: 0.9, carbs: 4.6, fat: 0.2, per: 100 },
  "Radicchio rosso": {
    calories: 13,
    protein: 1.3,
    carbs: 2.6,
    fat: 0.2,
    per: 100,
  },
  Zucchine: { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.2, per: 100 },
  Zucca: { calories: 26, protein: 1, carbs: 6.5, fat: 0.1, per: 100 },
  Carciofi: { calories: 47, protein: 2.7, carbs: 10.5, fat: 0.2, per: 100 },
  "Broccolo a testa": {
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    per: 100,
  },
  "Verdure fresche (media)": {
    calories: 25,
    protein: 1.5,
    carbs: 5,
    fat: 0.3,
    per: 100,
  },
  "Minestrone di verdure": {
    calories: 35,
    protein: 1.8,
    carbs: 7,
    fat: 0.4,
    per: 100,
  },

  // Frutta secca
  "Mandorle dolci - secche": {
    calories: 603,
    protein: 21.2,
    carbs: 19.5,
    fat: 53.8,
    per: 100,
  },
  "Noci - secche": {
    calories: 654,
    protein: 15.2,
    carbs: 13.7,
    fat: 65.2,
    per: 100,
  },

  // Condimenti e altro
  "Gocce di cioccolato fondente-Perugina": {
    calories: 545,
    protein: 5.9,
    carbs: 61,
    fat: 31,
    per: 100,
  },
  "Cioccolato fondente 85%": {
    calories: 592,
    protein: 7.8,
    carbs: 19,
    fat: 55,
    per: 100,
  },
  "Olio di oliva extra vergine": {
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    per: 100,
  },
  Pesto: { calories: 345, protein: 3.7, carbs: 3.5, fat: 35, per: 100 },
  "protein cream haselnuss": {
    calories: 544,
    protein: 21,
    carbs: 27,
    fat: 31,
    per: 100,
  },
};

const mealIcons = {
  Colazione: <Coffee className="h-5 w-5" />,
  "Spuntino Matt.": <Apple className="h-5 w-5" />,
  Pranzo: <UtensilsCrossed className="h-5 w-5" />,
  Merenda: <Cookie className="h-5 w-5" />,
  Cena: <ChefHat className="h-5 w-5" />,
};

const calculateNutrition = (items) => {
  let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

  items.forEach((item) => {
    if (!Array.isArray(item)) {
      // Ignora le alternative
      const [foodName, quantity] = item.split(": ");
      if (nutritionData[foodName]) {
        const grams = parseInt(quantity) || 0;
        const multiplier = grams / nutritionData[foodName].per;

        totals.calories += nutritionData[foodName].calories * multiplier;
        totals.protein += nutritionData[foodName].protein * multiplier;
        totals.carbs += nutritionData[foodName].carbs * multiplier;
        totals.fat += nutritionData[foodName].fat * multiplier;
      }
    }
  });

  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    carbs: Math.round(totals.carbs),
    fat: Math.round(totals.fat),
  };
};

const NutritionSummary = ({ nutrition }) => (
  <div className="grid grid-cols-4 gap-2 p-3 bg-white rounded-lg shadow-sm">
    <div className="flex flex-col items-center">
      <Flame className="h-4 w-4 text-red-500 mb-1" />
      <span className="text-xs text-gray-600">Kcal</span>
      <span className="font-semibold">{nutrition.calories}</span>
    </div>
    <div className="flex flex-col items-center">
      <Beef className="h-4 w-4 text-purple-500 mb-1" />
      <span className="text-xs text-gray-600">P</span>
      <span className="font-semibold">{nutrition.protein}g</span>
    </div>
    <div className="flex flex-col items-center">
      <Wheat className="h-4 w-4 text-yellow-500 mb-1" />
      <span className="text-xs text-gray-600">C</span>
      <span className="font-semibold">{nutrition.carbs}g</span>
    </div>
    <div className="flex flex-col items-center">
      <Droplets className="h-4 w-4 text-blue-500 mb-1" />
      <span className="text-xs text-gray-600">G</span>
      <span className="font-semibold">{nutrition.fat}g</span>
    </div>
  </div>
);

const App = () => {
  const [selectedDay, setSelectedDay] = useState("LUNEDÌ");
  const [isSwapMode, setIsSwapMode] = useState(false);
  const [firstDayToSwap, setFirstDayToSwap] = useState(null);
  const days = Object.keys(mealPlan);

  // Funzione per scambiare i giorni
  const handleDaySwap = (day) => {
    if (!firstDayToSwap) {
      setFirstDayToSwap(day);
    } else {
      const updatedMealPlan = { ...mealPlan };
      const temp = updatedMealPlan[firstDayToSwap];
      updatedMealPlan[firstDayToSwap] = updatedMealPlan[day];
      updatedMealPlan[day] = temp;
      Object.assign(mealPlan, updatedMealPlan);
      setFirstDayToSwap(null);
      setIsSwapMode(false);
    }
  };

  // Calcola i totali giornalieri
  const calculateDayTotals = (dayMeals) => {
    let dayTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    Object.values(dayMeals).forEach((mealItems) => {
      const mealNutrition = calculateNutrition(mealItems);
      dayTotals.calories += mealNutrition.calories;
      dayTotals.protein += mealNutrition.protein;
      dayTotals.carbs += mealNutrition.carbs;
      dayTotals.fat += mealNutrition.fat;
    });
    return dayTotals;
  };

  const DayButton = ({ day }) => (
    <button
      onClick={() => (isSwapMode ? handleDaySwap(day) : setSelectedDay(day))}
      className={`w-full h-9 text-xs font-medium flex items-center justify-center rounded-lg transition-all duration-200 ${
        selectedDay === day
          ? "bg-blue-500 text-white"
          : firstDayToSwap === day
          ? "bg-yellow-200 text-gray-800"
          : "bg-white text-gray-800 hover:bg-gray-100"
      } ${
        isSwapMode
          ? "relative border-2 border-dashed border-gray-300"
          : "border border-gray-200"
      }`}
    >
      {day.slice(0, 3)}
      {isSwapMode && firstDayToSwap === day && (
        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          1°
        </span>
      )}
    </button>
  );

  const MealSection = ({ title, items }) => {
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
              if (Array.isArray(item)) {
                return (
                  <div
                    key={index}
                    className="mt-2 pl-4 py-2 bg-gray-50 rounded-lg border-l-4 border-blue-200"
                  >
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item[0]}</span>
                    </div>
                  </div>
                );
              }
              const [foodName, quantity] = item.split(": ");
              const nutrition = nutritionData[foodName];
              return (
                <li
                  key={index}
                  className="text-sm flex items-center justify-between pl-2"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                  {nutrition && (
                    <span className="text-xs text-gray-500">
                      {Math.round(
                        nutrition.calories *
                          (parseInt(quantity) / nutrition.per)
                      )}{" "}
                      kcal
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

  const dayTotals = calculateDayTotals(mealPlan[selectedDay]);

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Logo Header */}
      <div className="flex items-center justify-center mb-6">
        <img
          src="/DietApp/images/plate-logo.png" 
          alt="Plate Logo" 
          className="h-12 w-12 mr-2"
        />
        <h1 className="text-2xl font-bold text-slate-700">PLATE</h1>
      </div>
  
      {/* Controlli per i giorni */}
      <div className="mb-4">
        <div className="flex justify-end mb-2">
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
  
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <DayButton key={day} day={day} />
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
  
      {/* Totali giornalieri in versione compatta */}
      <Card className="mb-6">
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Totali Giornalieri</CardTitle>
            <NutritionSummary nutrition={dayTotals} />
          </div>
        </CardHeader>
      </Card>
  
      {/* Sezioni pasti */}
      <div className="space-y-4">
        {Object.entries(mealPlan[selectedDay]).map(([meal, items]) => (
          <MealSection key={meal} title={meal} items={items} />
        ))}
      </div>
    </div>
  );
};

export default App;