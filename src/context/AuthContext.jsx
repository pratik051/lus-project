import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { MOCK_USER } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('luxstore_user_profile');
      return saved ? JSON.parse(saved) : MOCK_USER; // Default to Jane Doe for smooth demonstration
    } catch {
      return MOCK_USER;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('luxstore_user_profile', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('luxstore_user_profile');
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const updated = await authService.updateProfile(updates);
    setUser(prev => ({ ...prev, ...updated }));
    return updated;
  };

  const addAddress = (newAddress) => {
    const addr = {
      ...newAddress,
      id: `addr_${Date.now()}`
    };
    setUser(prev => ({
      ...prev,
      addresses: [...(prev.addresses || []), addr]
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
