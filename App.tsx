import React from 'react';
import NotificationCenter from './NotificationCenter';
import FocusTrapDialog from './FocusTrapDialog';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="w-full flex justify-end p-4">
        <NotificationCenter />
      </div>
      <div className="mt-8">
        <FocusTrapDialog />
      </div>
    </div>
  );
};

export default App;
