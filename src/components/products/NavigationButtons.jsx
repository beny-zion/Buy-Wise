import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const NavigationButtons = ({ onPrevious, onNext }) => {
  return (
    <>
      {/* כפתור למעלה - קודם */}
      <button
        onClick={onPrevious}
        className="fixed top-20 left-0 right-0 h-32 w-full 
                 bg-transparent hover:bg-black/5 
                 transition-colors duration-200
                 z-10 flex items-center justify-center"
      >
        <ChevronUp className="w-6 h-6 text-white/30" />
      </button>

      {/* כפתור למטה - הבא */}
      <button
        onClick={onNext}
        className="fixed bottom-0 left-0 right-0 h-32 w-full 
                 bg-transparent hover:bg-black/5
                 transition-colors duration-200
                 z-10 flex items-center justify-center"
      >
        <ChevronDown className="w-6 h-6 text-white/30" />
      </button>
    </>
  );
};

export default NavigationButtons;