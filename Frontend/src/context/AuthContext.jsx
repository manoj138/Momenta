import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const sessionUser = authService.getCurrentUser();
    if (sessionUser) return sessionUser;

    const savedUser = localStorage.getItem("momenta_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.status && response.data && response.data.user) {
        const loggedInUser = response.data.user;
        setUser(loggedInUser);
        localStorage.setItem("momenta_user", JSON.stringify(loggedInUser));
        return { success: true, user: loggedInUser };
      } else {
        return { success: false, message: response.message || "Invalid credentials" };
      }
    } catch (error) {
      console.warn("API Auth Login Failed, trying fallback check:", error);
      const errMsg = error.response?.data?.errors?.auth || error.response?.data?.errors?.email || "Invalid email or password";
      return { success: false, message: errMsg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("momenta_user");
    authService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
