import React from 'react';
import { Upload } from 'lucide-react';
import { Card, CardHeader } from './ui/card';

const UserSelector = ({ currentUser, users, onUserChange, onNewPlanUpload }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <select 
            value={currentUser} 
            onChange={(e) => onUserChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          
          <label className="flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            <span className="text-sm">Carica Piano</span>
            <input
              type="file"
              accept=".pdf,.csv"
              className="hidden"
              onChange={onNewPlanUpload}
            />
          </label>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserSelector;