export const createEmptyPlan = () => ({
  LUNEDÌ: createEmptyDayPlan(),
  MARTEDÌ: createEmptyDayPlan(),
  MERCOLEDÌ: createEmptyDayPlan(),
  GIOVEDÌ: createEmptyDayPlan(),
  VENERDÌ: createEmptyDayPlan(),
  SABATO: createEmptyDayPlan(),
  DOMENICA: createEmptyDayPlan()
});

export const createEmptyDayPlan = () => ({
  'Colazione': [],
  'Spuntino Matt.': [],
  'Pranzo': [],
  'Merenda': [],
  'Cena': []
});

export const convertToMealPlan = (data) => {
  const plan = createEmptyPlan();

  data.forEach(row => {
    if (row.Giorno && row.Pasto && row.Alimento) {
      const giorno = row.Giorno.toUpperCase();
      const pasto = row.Pasto;

      if (plan[giorno] && plan[giorno][pasto]) {
        // Crea l'oggetto alimento con i dati nutrizionali
        const item = {
          item: row.Quantita
            ? `${row.Alimento}: ${row.Quantita}`
            : row.Alimento,
          nutrition: {
            calories: parseFloat(row.Calorie) || 0,
            protein: parseFloat(row.Proteine) || 0,
            carbs: parseFloat(row.Carboidrati) || 0,
            fat: parseFloat(row.Grassi) || 0
          }
        };

        // Aggiungi l'alimento principale
        plan[giorno][pasto].push(item);

        // Se ci sono alternative, aggiungile con la stessa struttura nutrizionale
        if (row.Alternative) {
          plan[giorno][pasto].push({
            item: row.Alternative,
            alternative: true,
            nutrition: item.nutrition // Stessi valori nutrizionali dell'alimento principale
          });
        }
      }
    }
  });

  return plan;
};