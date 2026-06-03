import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isAdmin: boolean;
  rentedHouseId?: string;
  rentedEstateId?: string;
  listedEstateId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, profilePicture?: string) => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
  deleteAccount: () => void;
  applyForRent: (houseId: string, estateId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string): boolean => {
    if (email && password.length >= 6) {
      setUser({
        id: 'u1',
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email,
        isAdmin: false,
      });
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, _password: string, profilePicture?: string) => {
    setUser({
      id: 'u' + Date.now(),
      name,
      email,
      profilePicture,
      isAdmin: false,
    });
  };

  const signOut = () => setUser(null);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const deleteAccount = () => setUser(null);

  const applyForRent = (houseId: string, estateId: string) => {
    setUser(prev => prev ? { ...prev, rentedHouseId: houseId, rentedEstateId: estateId } : null);
  };

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user,
      signIn, register, signOut, updateUser, deleteAccount, applyForRent
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
