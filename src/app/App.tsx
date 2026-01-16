import React from 'react';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { Login } from '@/app/components/Login';
import { MemberDashboard } from '@/app/components/member/MemberDashboard';
import { BearerDashboard } from '@/app/components/bearer/BearerDashboard';
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';
import { Toaster } from '@/app/components/ui/sonner';

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // Add dark class to html element
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (!isAuthenticated || !user) {
    return <Login />;
  }

  // Route based on user role
  switch (user.role) {
    case 'member':
      return <MemberDashboard />;
    case 'bearer':
      return <BearerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Login />;
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
};

export default App;