export const parseNutritionData = (data) => {
  const nutritionData = {};
  data.forEach(row => {
    nutritionData[row.Alimento] = {
      calories: parseFloat(row.Calorie),
      protein: parseFloat(row.Proteine),
      carbs: parseFloat(row.Carboidrati),
      fat: parseFloat(row.Grassi),
      per: 100 // Assumiamo che i valori siano per 100g
    };
  });
  return nutritionData;
};

export const calculateNutrition = (items) => {
  // Verifica che items sia un array
  if (!Array.isArray(items)) {
    console.warn('items non è un array valido:', items);
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }

  // Calcola i totali nutrizionali
  const totals = items.reduce((totals, item) => {
    // Salta le alternative
    if (item.alternative) {
      return totals;
    }

    const nutrition = item.nutrition || {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };

    return {
      calories: totals.calories + (Number(nutrition.calories) || 0),
      protein: totals.protein + (Number(nutrition.protein) || 0),
      carbs: totals.carbs + (Number(nutrition.carbs) || 0),
      fat: totals.fat + (Number(nutrition.fat) || 0)
    };
  }, {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  // Arrotonda i valori a 1 decimale
  return {
    calories: Math.round(totals.calories),
    protein: Number(totals.protein.toFixed(1)),
    carbs: Number(totals.carbs.toFixed(1)),
    fat: Number(totals.fat.toFixed(1))
  };
};

export const exportNutritionData = (nutritionData) => {
  return Object.entries(nutritionData).map(([name, data]) => ({
    Alimento: name,
    Calorie: data.calories,
    Proteine: data.protein,
    Carboidrati: data.carbs,
    Grassi: data.fat,
    Porzione: data.per
  }));
};

export const calculateDailyTotals = (dayPlan) => {
  if (!dayPlan) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

  // Inizializza i totali
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  // Itera su tutti i pasti del giorno
  Object.values(dayPlan).forEach(mealItems => {
    if (!Array.isArray(mealItems)) return;

    // Calcola i totali per ogni pasto
    mealItems.forEach(item => {
      // Salta le alternative
      if (Array.isArray(item)) return;

      const nutrition = item.nutrition || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      };

      // Somma i valori nutrizionali
      totals.calories += Number(nutrition.calories) || 0;
      totals.protein += Number(nutrition.protein) || 0;
      totals.carbs += Number(nutrition.carbs) || 0;
      totals.fat += Number(nutrition.fat) || 0;
    });
  });

  // Arrotonda i valori
  return {
    calories: Math.round(totals.calories),
    protein: Number(totals.protein.toFixed(1)),
    carbs: Number(totals.carbs.toFixed(1)),
    fat: Number(totals.fat.toFixed(1))
  };
};