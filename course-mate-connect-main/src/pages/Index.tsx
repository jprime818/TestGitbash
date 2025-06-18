
import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';
import CourseRegistration from '@/components/CourseRegistration';
import Results from '@/components/Results';
import Notifications from '@/components/Notifications';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [studentName, setStudentName] = useState('John Doe');
  const [notificationCount, setNotificationCount] = useState(2);

  useEffect(() => {
    // Check if user is already logged in (in a real app, check localStorage/session)
    const loggedIn = localStorage.getItem('coursemate_logged_in');
    if (loggedIn) {
      setIsLoggedIn(true);
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLogin = (jambNumber: string, password: string) => {
    // In a real app, validate credentials with backend
    console.log('Login attempt:', { jambNumber, password });
    localStorage.setItem('coursemate_logged_in', 'true');
    setIsLoggedIn(true);
    setStudentName('John Doe'); // This would come from the API
  };

  const handleLogout = () => {
    localStorage.removeItem('coursemate_logged_in');
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  switch (currentView) {
    case 'registration':
      return <CourseRegistration setCurrentView={setCurrentView} />;
    case 'results':
      return <Results setCurrentView={setCurrentView} />;
    case 'notifications':
      return <Notifications setCurrentView={setCurrentView} />;
    case 'timetable':
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Timetable Download</h2>
            <p className="text-gray-600">Feature coming soon...</p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    case 'profile':
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
            <p className="text-gray-600">Feature coming soon...</p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    default:
      return (
        <Dashboard
          currentView={currentView}
          setCurrentView={setCurrentView}
          notifications={notificationCount}
          studentName={studentName}
        />
      );
  }
};

export default Index;
