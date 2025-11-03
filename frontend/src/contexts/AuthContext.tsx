import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../api/axios";
import { AuthContextType, User, LoginResponse } from "../types/index";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get<User>("/auth/me");
        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // 🔐 Login
  const login = useCallback(async (email: string, password: string) => {

    console.log('login now')
    try {
      const res = await api.post<LoginResponse>("/auth/login", { email, password });
      console.log('logueando', res.data)
      setUser(res.data.user);
      setIsAuthenticated(true);

      if (res.data.token) {
        localStorage.setItem("jwt_token", res.data.token);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  }, []);

  // 🚪 Logout
  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
    } finally {
      localStorage.removeItem("jwt_token");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
     const res = await api.post("/auth/register", { name, email, password });
         setUser(res.data.user);
      setIsAuthenticated(true);

      if (res.data.token) {
        localStorage.setItem("jwt_token", res.data.token);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al registrar");
    }
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
