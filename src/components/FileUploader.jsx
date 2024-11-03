// src/components/FileUploader.jsx
import React from 'react';
import { Upload } from 'lucide-react';

const FileUploader = ({ onFileUpload, acceptedTypes, label }) => {
  return (
    <label className="flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
      <Upload className="h-4 w-4 mr-2" />
      <span className="text-sm">{label}</span>
      <input
        type="file"
        accept={acceptedTypes}
        className="hidden"
        onChange={onFileUpload}
      />
    </label>
  );
};

export default FileUploader;