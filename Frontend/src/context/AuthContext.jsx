import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("momenta_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    // Mock login verification
    if (email === "superadmin@momenta.com" && password === "password") {
      const adminUser = {
        id: "usr_super_admin",
        email: "superadmin@momenta.com",
        name: "Super Admin",
        role: "super_admin",
      };
      setUser(adminUser);
      localStorage.setItem("momenta_user", JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    } else if (email === "creator@momenta.com" && password === "password") {
      const creatorUser = {
        id: "usr_creator",
        email: "creator@momenta.com",
        name: "Creator Manoj",
        role: "creator",
        assignedCategories: ["wedding", "birthday", "proposal", "anniversary", "surprise", "company"],
      };
      setUser(creatorUser);
      localStorage.setItem("momenta_user", JSON.stringify(creatorUser));
      return { success: true, user: creatorUser };
    } else {
      return { success: false, message: "Invalid email or password. Use superadmin@momenta.com or creator@momenta.com with password 'password'." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("momenta_user");
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
