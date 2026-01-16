import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, authenticateUser, UserRole } from '@/app/data/users';

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rotaract_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (identifier: string, password: string, role: UserRole): boolean => {
    const authenticatedUser = authenticateUser(identifier, password, role);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('rotaract_user', JSON.stringify(authenticatedUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rotaract_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
