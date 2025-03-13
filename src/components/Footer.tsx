
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-4 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FaceCut. All rights reserved.</p>
          <p className="mt-1">Facial Analysis & Haircut Recommendation System</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
