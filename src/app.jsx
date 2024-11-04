import React, { useState, useEffect, useRef } from "react";
import {
  Coffee,
  Apple,
  UtensilsCrossed,
  Cookie,
  ChefHat,
  Info,
  ArrowLeftRight,
  Edit2,
  Undo2,
  RotateCcw,
  ChevronDown
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import UserSelector from "./components/UserSelector";
import MealEditor from "./components/MealEditor";
import MealPlanEditor from "./components/MealPlanEditor";
import DayButton from './components/DayButton';
import NutritionSummary from './components/NutritionSummary';
import MealSection from './components/MealSection';
import SwipeableView from './components/SwipeableView';
import { useLocalStorage } from './hooks/useLocalStorage';
import { parseFile } from "./utils/fileHandler";
import { parseNutritionData, calculateNutrition, calculateDailyTotals } from './utils/nutritionParser';
import { createEmptyPlan } from './utils/planStructure';
import NameInputDialog from './components/NameInputDialog';
import Toast from './components/Toast';
import RenamePlanDialog from './components/RenamePlanDialog';
import WelcomeDialog from './components/WelcomeDialog';
import logo from './assets/DietApp-logo.png';

// Icone per i pasti
const mealIcons = {
  Colazione: <Coffee className="h-5 w-5" />,
  "Spuntino Matt.": <Apple className="h-5 w-5" />,
  Pranzo: <UtensilsCrossed className="h-5 w-5" />,
  Merenda: <Cookie className="h-5 w-5" />,
  Cena: <ChefHat className="h-5 w-5" />,
};

// Funzione per ottenere il giorno corrente
function getCurrentDay() {
  const days = ['DOMENICA', 'LUNEDÌ', 'MARTEDÌ', 'MERCOLEDÌ', 'GIOVEDÌ', 'VENERDÌ', 'SABATO'];
  return days[new Date().getDay()];
}

// Componente principale App
const App = () => {
  // Stati di base
  const [mealPlans, setMealPlans] = useLocalStorage('mealPlans', []);
  const [currentPlanId, setCurrentPlanId] = useLocalStorage('currentPlanId', null);
  const [nutritionData, setNutritionData] = useLocalStorage('nutritionData', {});
  const [userName, setUserName] = useLocalStorage('userName', '');

  // Nuovi stati per il dialogo di benvenuto
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);

  // Stato per il giorno selezionato
  const [selectedDay, setSelectedDay] = useLocalStorage('selectedDay', getCurrentDay());

  // Effetto per impostare il giorno corrente quando cambia il piano
  useEffect(() => {
    if (currentPlanId) {
      setSelectedDay(getCurrentDay());
    }
  }, [currentPlanId]); // Si attiva quando cambia il piano corrente

  // Stati UI
  const [isSwapMode, setIsSwapMode] = useState(false);
  const [firstDayToSwap, setFirstDayToSwap] = useState(null);
  const [swappedDays, setSwappedDays] = useLocalStorage('swappedDays', []);
  const [editingMeal, setEditingMeal] = useState(null);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [toast, setToast] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [planToRename, setPlanToRename] = useState(null);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [showPlanEditor, setShowPlanEditor] = useState(false);
  const [tempPlanName, setTempPlanName] = useState('');
  const [showPlanMenu, setShowPlanMenu] = useState(false);

  // Variabile per il piano corrente
  const currentPlan = mealPlans.find(plan => plan.id === currentPlanId);

  const showToast = (message, type = 'success', action = null) => {
    setToast({ message, type, action });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const newPlan = await parseFile(file);
      const planId = `plan-${Date.now()}`;
      const planName = file.name.split('.')[0];

      setMealPlans(prev => [...prev, { 
        id: planId, 
        name: planName,
        plan: newPlan,
        created: new Date().toISOString() 
      }]);
      setCurrentPlanId(planId);
      setShowWelcomeDialog(true);
    } catch (error) {
      console.error('Errore nel caricamento:', error);
      showToast(`Errore nel caricamento del file: ${error.message}`, 'error');
    }
  };

  const handleNutritionUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const newNutritionData = await parseNutritionData(file);
      setNutritionData(prev => ({
        ...prev,
        ...newNutritionData
      }));
      alert('Informazioni nutrizionali caricate con successo!');
    } catch (error) {
      console.error('Errore nel caricamento:', error);
      alert(`Errore nel caricamento del file: ${error.message}`);
    }
  };

  const handleDeletePlan = (planId) => {
    // Verifica se stiamo eliminando il piano corrente
    const isDeletingCurrentPlan = planId === currentPlanId;

    // Trova i piani rimanenti PRIMA di modificare lo stato
    const remainingPlans = mealPlans.filter(p => p.id !== planId);
    
    // Se stiamo eliminando il piano corrente, aggiorna prima il currentPlanId
    if (isDeletingCurrentPlan) {
      if (remainingPlans.length > 0) {
        setCurrentPlanId(remainingPlans[0].id);
      } else {
        setCurrentPlanId(null);
      }
      setSwappedDays([]);
    }

    // Solo dopo aggiorna la lista dei piani
    setMealPlans(remainingPlans);
    showToast('Piano eliminato con successo', 'success');
  };

  const handleClearAllPlans = () => {
    setMealPlans([]);
    setCurrentPlanId(null);
    setSwappedDays([]);
    showToast('Tutti i piani sono stati eliminati', 'success');
  };

  const handleDaySwap = (day) => {
    if (!firstDayToSwap) {
      setFirstDayToSwap(day);
    } else if (firstDayToSwap !== day) {
      const currentPlan = mealPlans.find(p => p.id === currentPlanId);
      if (!currentPlan) return;

      const newPlan = {...currentPlan};
      const temp = {...newPlan.plan[firstDayToSwap]};
      newPlan.plan[firstDayToSwap] = {...newPlan.plan[day]};
      newPlan.plan[day] = temp;

      setMealPlans(prev => prev.map(p => 
        p.id === currentPlanId ? newPlan : p
      ));

      setSwappedDays(prev => [...prev, {
        day1: firstDayToSwap,
        day2: day,
        date: new Date().toISOString()
      }]);

      setFirstDayToSwap(null);
      setIsSwapMode(false);
    }
  };

  const handleSwipe = (direction) => {
    const days = Object.keys(currentPlan.plan);
    const currentIndex = days.indexOf(selectedDay);
    const newIndex = direction === 'left'
      ? (currentIndex + 1) % days.length
      : (currentIndex - 1 + days.length) % days.length;
    setSelectedDay(days[newIndex]);
  };

  const handleRenamePlan = (newName) => {
    // Assicuriamoci che il nome contenga sempre il prefisso "Piano Alimentare" se non presente
    const fullName = newName.toLowerCase().includes('piano') 
      ? newName 
      : `Piano Alimentare ${newName}`;

    setMealPlans(prev => prev.map(plan => 
      plan.id === planToRename.id 
        ? { ...plan, name: fullName }
        : plan
    ));
    setIsRenaming(false);
    setPlanToRename(null);
    showToast('Piano rinominato con successo', 'success');
  };

  const handleAddNewPlan = () => {
    setShowNameDialog(true);
  };

  const handleNameConfirm = (name) => {
    setTempPlanName(name);
    setShowNameDialog(false);
    setShowPlanEditor(true);
  };

  const handlePlanCreate = (planData) => {
    const newPlan = {
      id: `plan-${Date.now()}`,
      name: tempPlanName,
      plan: planData,
      created: new Date().toISOString()
    };
    
    setMealPlans(prev => [...prev, newPlan]);
    setCurrentPlanId(newPlan.id);
    setShowPlanEditor(false);
    setTempPlanName('');
  };

  const handleEditPlan = () => {
    if (currentPlanId) {
      setIsEditingPlan(true);
    }
  };

  const handleSavePlan = (updatedPlanData) => {
    if (isEditingPlan) {
      setMealPlans(prev => prev.map(p => 
        p.id === currentPlanId 
          ? { ...p, plan: updatedPlanData }
          : p
      ));
      setIsEditingPlan(false);
      showToast('Piano aggiornato con successo', 'success');
    } else {
      const currentPlan = mealPlans.find(p => p.id === currentPlanId);
      if (currentPlan) {
        setMealPlans(prev => prev.map(p => 
          p.id === currentPlanId 
            ? { ...p, plan: updatedPlanData }
            : p
        ));
        setIsAddingPlan(false);
        showToast('Nuovo piano creato con successo', 'success');
      }
    }
  };

  // Funzione per ottenere un saluto in base all'ora
  const getGreeting = () => {
    const hour = new Date().getHours();
    const greeting = hour >= 5 && hour < 12 ? "Buongiorno" :
                    hour >= 12 && hour < 18 ? "Buon pomeriggio" :
                    "Buonasera";
    return `${greeting}, ${userName || 'Ospite'} 👋`;
  };

  // Calcola i totali per il giorno selezionato
  const dailyTotals = currentPlan?.plan?.[selectedDay] 
    ? calculateDailyTotals(currentPlan.plan[selectedDay])
    : { calories: 0, protein: 0, carbs: 0, fat: 0 };

  // Aggiungi questa funzione
  const handlePlanChange = (planId) => {
    setCurrentPlanId(planId);
    setSelectedDay(getCurrentDay());
  };

  // Funzione per ripristinare l'ultimo scambio
  const handleUndoLastSwap = () => {
    if (swappedDays.length === 0) return;

    const currentPlan = mealPlans.find(p => p.id === currentPlanId);
    if (!currentPlan) return;

    const lastSwap = swappedDays[swappedDays.length - 1];
    const newPlan = {...currentPlan};
    
    // Correggiamo l'accesso ai giorni del piano
    const temp = {...newPlan.plan[lastSwap.day1]};
    newPlan.plan[lastSwap.day1] = {...newPlan.plan[lastSwap.day2]};
    newPlan.plan[lastSwap.day2] = temp;

    setMealPlans(prev => prev.map(p => 
      p.id === currentPlanId ? newPlan : p
    ));

    setSwappedDays(prev => prev.slice(0, -1));
  };

  // Funzione per ripristinare tutti gli scambi
  const handleResetAllSwaps = () => {
    if (swappedDays.length === 0) return;

    const currentPlan = mealPlans.find(p => p.id === currentPlanId);
    if (!currentPlan) return;

    let newPlan = {...currentPlan};
    [...swappedDays].reverse().forEach(swap => {
      const temp = {...newPlan.plan[swap.day1]};
      newPlan.plan[swap.day1] = {...newPlan.plan[swap.day2]};
      newPlan.plan[swap.day2] = temp;
    });

    setMealPlans(prev => prev.map(p => 
      p.id === currentPlanId ? newPlan : p
    ));

    setSwappedDays([]);
  };

  // Render del componente
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-50 bg-gray-50 pb-4">
        {/* Logo e titolo */}
        <div className="flex items-center justify-start mb-3">
          <img 
            src={logo} 
            alt="DietApp Logo" 
            className="h-8 w-8 mr-2 object-contain" 
          />
          <span className="text-2xl font-bold text-gray-700">DietApp</span>
        </div>

        {/* Card del saluto */}
        {currentPlanId && (
          <Card className="mb-2">
            <CardHeader className="py-3 px-4">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-700">
                  {getGreeting()}
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
        )}

        {/* Box selettore piano con freccia */}
        <div 
          onClick={() => setShowPlanMenu(!showPlanMenu)}
          className="cursor-pointer mb-4"
        >
          <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              {currentPlanId 
                ? mealPlans.find(p => p.id === currentPlanId)?.name 
                : "Seleziona o carica un piano"}
            </span>
            <ChevronDown 
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                showPlanMenu ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>

        {/* Menu a scomparsa */}
        {showPlanMenu && (
          <div className="mb-4">
            <UserSelector 
              currentUser={currentPlanId}
              users={mealPlans.map(p => ({ id: p.id, name: p.name }))}
              onUserChange={(id) => {
                handlePlanChange(id);
                setShowPlanMenu(false);
              }}
              onPlanUpload={handleFileUpload}
              onNutritionUpload={handleNutritionUpload}
              onDeletePlan={handleDeletePlan}
              onClearAll={handleClearAllPlans}
              onAddManualPlan={handleAddNewPlan}
            />
          </div>
        )}

        {currentPlanId && (
          <>
            {/* Barra dei controlli */}
            <div className="flex justify-between items-center mb-2">
              {/* Pulsante di scambio a sinistra */}
              <button
                onClick={() => {
                  setIsSwapMode(!isSwapMode);
                  setFirstDayToSwap(null);
                }}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isSwapMode
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                title={isSwapMode ? "Annulla Scambio" : "Scambia Giorni"}
              >
                <ArrowLeftRight className="h-5 w-5" />
              </button>

              {/* Controlli di annullamento a destra */}
              <div className="flex space-x-2">
                {swappedDays.length > 0 && (
                  <>
                    <button
                      onClick={handleUndoLastSwap}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                      title="Annulla Ultimo Scambio"
                    >
                      <Undo2 className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={handleResetAllSwaps}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                      title="Ripristina Tutti gli Scambi"
                    >
                      <RotateCcw className="h-5 w-5 text-red-600" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Selettore giorni */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['LUNEDÌ', 'MARTEDÌ', 'MERCOLEDÌ', 'GIOVEDÌ', 'VENERDÌ', 'SABATO', 'DOMENICA'].map((day) => {
                const swap = swappedDays.find(
                  swap => swap.day1 === day || swap.day2 === day
                );
                
                const swapInfo = swap ? {
                  otherDay: swap.day1 === day ? swap.day2 : swap.day1,
                  date: swap.date
                } : null;

                return (
                  <DayButton 
                    key={day} 
                    day={day}
                    isSelected={selectedDay === day}
                    isSwapMode={isSwapMode}
                    isFirstDay={firstDayToSwap === day}
                    isSwapped={!!swap}
                    swapInfo={swapInfo}
                    onClick={() => isSwapMode ? handleDaySwap(day) : setSelectedDay(day)}
                  />
                );
              })}
            </div>

            {/* Indicatori di swap - manteniamo solo questo durante lo swap */}
            {isSwapMode && (
              <div className="mt-2 text-sm text-center text-gray-600 mb-4">
                {!firstDayToSwap
                  ? "Seleziona il primo giorno da scambiare"
                  : "Ora seleziona il secondo giorno per completare lo scambio"}
              </div>
            )}
          </>
        )}
      </div>

      {/* Welcome Dialog */}
      {showWelcomeDialog && (
        <WelcomeDialog
          onSaveName={(name) => {
            setUserName(name);
            setShowWelcomeDialog(false);
          }}
          onClose={() => setShowWelcomeDialog(false)}
        />
      )}

      {/* Name Input Dialog */}
      {showNameDialog && (
        <NameInputDialog
          onConfirm={handleNameConfirm}
          onCancel={() => setShowNameDialog(false)}
        />
      )}

      {/* Meal Plan Editor */}
      {showPlanEditor && (
        <MealPlanEditor
          nutritionData={nutritionData}
          onSave={handlePlanCreate}
          onCancel={() => {
            setShowPlanEditor(false);
            setTempPlanName('');
          }}
        />
      )}

      {/* Contenuto principale con swipe */}
      {currentPlanId && currentPlan?.plan && (
        <SwipeableView onSwipe={handleSwipe}>
          <div className="space-y-4 mt-4">
            {/* Totali giornalieri */}
            <Card className="mb-6">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-medium">Totali Giornalieri</CardTitle>
                <CardContent>
                  <NutritionSummary nutrition={dailyTotals} />
                </CardContent>
              </CardHeader>
            </Card>

            {/* Sezioni pasti */}
            {Object.entries(currentPlan.plan[selectedDay] || {}).map(([meal, items]) => (
              <div key={meal} className="relative">
                <button
                  onClick={() => setEditingMeal({ meal, items })}
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
        </SwipeableView>
      )}

      {/* Editor dei pasti */}
      {editingMeal && (
        <MealEditor
          meal={editingMeal.meal}
          items={editingMeal.items}
          nutritionData={nutritionData}
          onSave={(editedItems) => {
            const updatedPlan = { ...currentPlan };
            updatedPlan.plan[selectedDay][editingMeal.meal] = editedItems;
            setMealPlans(prev => prev.map(p => 
              p.id === currentPlanId ? updatedPlan : p
            ));
            setEditingMeal(null);
          }}
          onCancel={() => setEditingMeal(null)}
        />
      )}

      {/* Editor piano completo */}
      {isAddingPlan || isEditingPlan && currentPlan && (
        <MealPlanEditor
          nutritionData={nutritionData}
          initialPlan={currentPlan.plan}
          isEditing={isEditingPlan}
          onSave={(plan) => {
            handleSavePlan(plan);
          }}
          onCancel={() => {
            if (isAddingPlan) {
              setMealPlans(prev => prev.filter(p => p.id !== currentPlanId));
              setCurrentPlanId(null);
            }
            setIsAddingPlan(false);
            setIsEditingPlan(false);
          }}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          action={toast.action}
          onClose={() => setToast(null)}
        />
      )}

      {isRenaming && planToRename && (
        <RenamePlanDialog
          currentName={planToRename.name}
          onConfirm={handleRenamePlan}
          onCancel={() => {
            setIsRenaming(false);
            setPlanToRename(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
