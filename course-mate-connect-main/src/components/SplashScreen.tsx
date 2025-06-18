
import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 1000);
    const timer2 = setTimeout(() => onComplete(), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white">
      <div className="animate-fade-in">
        <GraduationCap 
          size={120} 
          className="mx-auto mb-8 animate-pulse"
        />
      </div>
      {showText && (
        <div className="animate-slide-in-right">
          <h1 className="text-4xl font-bold text-center">CourseMate</h1>
          <p className="text-lg text-center mt-2 opacity-90">Your Academic Companion</p>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
