import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import logo from '../assets/DietApp-logo.png';

const WelcomeDialog = ({ onSaveName, onClose }) => {
  const [name, setName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSaveName(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img src={logo} alt="DietApp Logo" className="h-16 w-auto" />
          </div>
          <CardTitle>Benvenuto nel tuo Piano Alimentare! 👋</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">Piano alimentare caricato correttamente! Come possiamo chiamarti?</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Inserisci il tuo nome"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={!name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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

export default WelcomeDialog;