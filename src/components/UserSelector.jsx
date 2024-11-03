// src/components/UserSelector.jsx
import React, { useRef, useState } from 'react';
import { Plus, Trash2, Upload, Download } from 'lucide-react';
import { Card, CardHeader } from './ui/card';

const UserSelector = ({
  currentUser,
  users,
  onUserChange,
  onDeletePlan,
  onClearAll,
  onAddManualPlan,
  onPlanUpload
}) => {
  const fileInputRef = useRef(null);
  const [tooltip, setTooltip] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onPlanUpload(e);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateTemplate = () => {
    const headers = [
      'Giorno',
      'Pasto',
      'Alimento',
      'Quantita',
      'Calorie',
      'Proteine',
      'Carboidrati',
      'Grassi',
      'Alternative'
    ];

    const exampleRows = [
      ['Lunedì', 'Colazione', 'Pane integrale', '50g', '131', '4', '27', '1', 'Fette biscottate'],
      ['Lunedì', 'Colazione', 'Marmellata', '20g', '49', '0', '12', '0', 'Miele'],
      ['Lunedì', 'Spuntino Matt.', 'Mela', '150g', '77', '0.4', '20.6', '0.3', 'Pera'],
      ['Lunedì', 'Pranzo', 'Pasta integrale', '80g', '280', '9', '58', '2', ''],
      ['Lunedì', 'Pranzo', 'Petto di pollo', '150g', '165', '31', '0', '3.6', 'Tacchino'],
      ['Lunedì', 'Merenda', 'Yogurt greco', '170g', '100', '17', '4', '0', ''],
      ['Lunedì', 'Cena', 'Salmone', '150g', '208', '22', '0', '13', 'Pesce spada']
    ];

    return [...[headers], ...exampleRows];
  };

  const downloadTemplate = () => {
    const templateData = generateTemplate();
    
    // Convertiamo l'array in stringa CSV
    const csvContent = templateData
      .map(row => row.join(','))
      .join('\n');

    // Creiamo il Blob con il contenuto CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Creiamo il link per il download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_piano_alimentare.csv');
    document.body.appendChild(link);
    
    // Triggeriamo il download
    link.click();
    
    // Pulizia
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="py-3 px-4">
        <div className="space-y-4">
          {/* Contenitore principale con flex */}
          <div className="flex items-center gap-2">
            {/* Select per i piani */}
            <div className="flex-grow">
              <select 
                value={currentUser || ''}
                onChange={(e) => onUserChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200"
              >
                <option value="">Seleziona un piano</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>

            {/* Gruppo di pulsanti allineati */}
            <div className="flex items-center gap-2">
              {/* Upload CSV */}
              <div className="relative">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                  onMouseEnter={() => setTooltip('upload')}
                  onMouseLeave={() => setTooltip('')}
                >
                  <Upload className="h-5 w-5" />
                </button>
                {tooltip === 'upload' && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Carica Piano CSV
                  </div>
                )}
              </div>

              {/* Download Template */}
              <div className="relative">
                <button
                  onClick={downloadTemplate}
                  className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                  onMouseEnter={() => setTooltip('download')}
                  onMouseLeave={() => setTooltip('')}
                >
                  <Download className="h-5 w-5" />
                </button>
                {tooltip === 'download' && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Scarica Template CSV
                  </div>
                )}
              </div>

              {/* Nuovo Piano */}
              <div className="relative">
                <button
                  onClick={onAddManualPlan}
                  className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"
                  onMouseEnter={() => setTooltip('new')}
                  onMouseLeave={() => setTooltip('')}
                >
                  <Plus className="h-5 w-5" />
                </button>
                {tooltip === 'new' && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Nuovo Piano
                  </div>
                )}
              </div>

              {/* Delete Piano */}
              {currentUser && (
                <div className="relative">
                  <button
                    onClick={() => onDeletePlan(currentUser)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    onMouseEnter={() => setTooltip('delete')}
                    onMouseLeave={() => setTooltip('')}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  {tooltip === 'delete' && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Elimina Piano
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Input file nascosto */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Pulsante elimina tutti */}
          {users.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Sei sicuro di voler eliminare tutti i piani?')) {
                  onClearAll();
                }
              }}
              className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span className="text-sm">Elimina Tutti i Piani</span>
            </button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserSelector;