import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAuthenticated as checkAuth, setAuthenticated, logout as doLogout } from '@/lib/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Controlla lo stato di autenticazione all'avvio
    setIsLoggedIn(checkAuth());
  }, []);

  const login = () => {
    setAuthenticated(true);
    setIsLoggedIn(true);
  };

  const logout = () => {
    doLogout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
