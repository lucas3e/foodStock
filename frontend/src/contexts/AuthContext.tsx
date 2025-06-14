import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@FoodStock:token');
    const userData = localStorage.getItem('@FoodStock:user');

    if (token && userData) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user: userData } = response.data;

      localStorage.setItem('@FoodStock:token', token);
      localStorage.setItem('@FoodStock:user', JSON.stringify(userData));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setUser(userData);
    } catch (error) {
      throw new Error('Credenciais inválidas');
    }
  };

  const signOut = () => {
    localStorage.removeItem('@FoodStock:token');
    localStorage.removeItem('@FoodStock:user');

    api.defaults.headers.authorization = '';

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
