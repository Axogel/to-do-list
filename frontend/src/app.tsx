import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginRegister from './components/LoginRegister';
import TaskDashboard from './components/TaskDashboard';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState<'login' | 'dashboard'>(isAuthenticated ? 'dashboard' : 'login');

  useEffect(() => {
    setPage(isAuthenticated ? 'dashboard' : 'login');
  }, [isAuthenticated]);

  return (
    <div className="App min-h-screen font-sans">
      {page === 'login' ? (
        <LoginRegister onSuccess={() => setPage('dashboard')} />
      ) : (
        <TaskDashboard />
      )}
    </div>
  );
};

export default App;
