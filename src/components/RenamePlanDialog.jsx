import React, { useState } from 'react';

const RenamePlanDialog = ({ currentName, onConfirm, onCancel }) => {
  const [newName, setNewName] = useState(currentName || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      onConfirm(newName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Rinomina Piano
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label 
                htmlFor="planName" 
                className="block text-sm font-medium text-gray-700"
              >
                Nuovo nome
              </label>
              <input
                id="planName"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Inserisci il nuovo nome"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={!newName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Conferma
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RenamePlanDialog;