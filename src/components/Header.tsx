
import React from 'react';
import { Scissors } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-haircut-blue p-2 rounded-md">
              <Scissors className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">FaceCut</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Haircut Recommendation System
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
