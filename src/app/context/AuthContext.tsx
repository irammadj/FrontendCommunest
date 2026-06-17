import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isAdmin: boolean;
  isSuperAdmin?: boolean;
  rentedHouseId?: string;
  rentedEstateId?: string;
  listedEstateId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => boolean;
  register: (
    name: string,
    email: string,
    password: string,
    profilePicture?: string,
  ) => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateUserSuperAdmin: (isSuperAdmin: boolean) => void;
  deleteAccount: () => void;
  applyForRent: (houseId: string, estateId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string): boolean => {
    // Super Admin account
    if (
      email === "superadmin@communest.co.ke" &&
      password === "superadmin123"
    ) {
      setUser({
        id: "superadmin",
        name: "Communest Admin",
        email: "superadmin@communest.co.ke",
        isAdmin: true,
        isSuperAdmin: true,
      });
      return true;
    }

    // Demo accounts
    if (email === "demo@communest.co.ke" && password === "demo123") {
      setUser({
        id: "demo",
        name: "Demo User",
        email: "demo@communest.co.ke",
        isAdmin: false,
      });
      return true;
    }
    if (email === "admin@communest.co.ke" && password === "admin123") {
      setUser({
        id: "admin1",
        name: "Estate Admin",
        email: "admin@communest.co.ke",
        isAdmin: true,
        listedEstateId: "est1",
      });
      return true;
    }
    if (email === "tenant@communest.co.ke" && password === "tenant123") {
      setUser({
        id: "tenant1",
        name: "Demo Tenant",
        email: "tenant@communest.co.ke",
        isAdmin: false,
        rentedHouseId: "h1",
        rentedEstateId: "est1",
      });
      return true;
    }

    // Check if user exists in localStorage with isSuperAdmin status
    const storedUsers = localStorage.getItem("communest_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find(
        (u: User) => u.email === email && u.password === password,
      );
      if (foundUser) {
        setUser(foundUser);
        return true;
      }
    }

    // Generic registration
    if (email && password.length >= 6) {
      setUser({
        id: "u1",
        name: email
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        isAdmin: false,
      });
      return true;
    }
    return false;
  };

  const register = (
    name: string,
    email: string,
    password: string,
    profilePicture?: string,
  ) => {
    const newUser: User = {
      id: "u" + Date.now(),
      name,
      email,
      profilePicture,
      isAdmin: false,
    };

    // Store in localStorage
    const storedUsers = localStorage.getItem("communest_users") || "[]";
    const users = JSON.parse(storedUsers);
    users.push({ ...newUser, password });
    localStorage.setItem("communest_users", JSON.stringify(users));

    setUser(newUser);
  };

  const signOut = () => setUser(null);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const updateUserSuperAdmin = (isSuperAdmin: boolean) => {
    setUser((prev) => (prev ? { ...prev, isSuperAdmin } : null));
  };

  const deleteAccount = () => setUser(null);

  const applyForRent = (houseId: string, estateId: string) => {
    setUser((prev) =>
      prev
        ? { ...prev, rentedHouseId: houseId, rentedEstateId: estateId }
        : null,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        register,
        signOut,
        updateUser,
        updateUserSuperAdmin,
        deleteAccount,
        applyForRent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
