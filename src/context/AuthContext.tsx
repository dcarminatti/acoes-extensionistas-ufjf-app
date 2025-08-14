"use client";

import { User } from "@/types/User";
import { createContext, useContext, useState } from "react";

import data from "@/mock/data.json";

interface AuthContextType {
  user: User | undefined;
  login: (email: string, password: string | undefined) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (email: string, password: string | undefined) => {
    if (email === "coordinator@ufjf.br" && password === "senha123") {
      const user = data.users[0] as User;
      setUser(user);
      return true;
    } else if (email === "teacher@ufjf.br" && password === "senha123") {
      const user = data.users[1] as User;
      setUser(user);
      return true;
    } else if (email === "student@ufjf.br" && password === "senha123") {
      const user = data.users[2] as User;
      setUser(user);
      return true;
    }

    return false;
  };
  const logout = () => setUser(undefined);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
