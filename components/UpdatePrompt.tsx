import React from 'react';

interface UpdatePromptProps {
  onUpdate: () => void;
}

export const UpdatePrompt: React.FC<UpdatePromptProps> = ({ onUpdate }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-slate-800 text-white rounded-lg shadow-xl p-4 flex items-center animate-fade-in-up">
      <div className="flex-grow">
        <p className="font-bold text-sm">Update verfügbar!</p>
        <p className="text-sm text-slate-300">Eine neue Version ist bereit.</p>
      </div>
      <button
        onClick={onUpdate}
        className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm"
      >
        Aktualisieren
      </button>
    </div>
  );
};
