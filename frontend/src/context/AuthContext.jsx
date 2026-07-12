import { createContext, useContext, useState, useCallback } from 'react';
import authService, { decodeToken } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem('userEmail') || ''
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || ''
  );

  const login = useCallback((token, email) => {
    authService.setToken(token);
    localStorage.setItem('userEmail', email);
    
    const decoded = decodeToken(token);
    const role = decoded?.role || '';
    localStorage.setItem('userRole', role);
    
    setUserEmail(email);
    setUserRole(role);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUserEmail('');
    setUserRole('');
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
