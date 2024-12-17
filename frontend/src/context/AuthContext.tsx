import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextProps {
  token: string | null;
  role: string | null;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: { role: string, id: string } = jwtDecode(token);
        setRole(decodedToken.role);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token", error);
        logout(); 
      }
    } else {
      setRole(null);
      setUserId(null);
    }
  }, [token]);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    try {
      const decodedToken: { role: string, id: string } = jwtDecode(token);
      setRole(decodedToken.role);
      setUserId(decodedToken.id);
    } catch (error) {
      console.error("Invalid token", error);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        setToken(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
