import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  authToken: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const  [authToken, setAuthToken ] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function getCookie(name: string): string | undefined {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookie = parts.pop()?.split(';').shift();
        return cookie;
      }
    }

    const token = getCookie('auth-token');
    
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(null);
      navigate('/login')
    }
  }, [navigate]);

  const logout = () => {
    setAuthToken(null);
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider value={{ authToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;