// src/components/NameInputDialog.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const NameInputDialog = ({ onConfirm, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Nuovo Piano Alimentare</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="planName" className="text-sm font-medium text-gray-700">
                Nome del piano
              </label>
              <input
                id="planName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Inserisci il nome del piano"
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
                disabled={!name.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Conferma
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameInputDialog;