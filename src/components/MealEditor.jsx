import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const MealEditor = ({ meal, items, onSave, onCancel }) => {
  const [editedItems, setEditedItems] = useState([...items]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Modifica {meal}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editedItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={Array.isArray(item) ? item[0] : item}
                  onChange={(e) => {
                    const newItems = [...editedItems];
                    if (Array.isArray(item)) {
                      newItems[index] = [e.target.value];
                    } else {
                      newItems[index] = e.target.value;
                    }
                    setEditedItems(newItems);
                  }}
                  className="flex-1 px-3 py-2 rounded-lg border"
                />
                <button
                  onClick={() => {
                    const newItems = editedItems.filter((_, i) => i !== index);
                    setEditedItems(newItems);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            <button
              onClick={() => setEditedItems([...editedItems, ""])}
              className="w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              + Aggiungi alimento
            </button>
          </div>
        </CardContent>
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Annulla
          </button>
          <button
            onClick={() => onSave(editedItems)}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Salva
          </button>
        </div>
      </Card>
    </div>
  );
};

export default MealEditor;