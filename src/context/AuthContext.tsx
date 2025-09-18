import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string, mobile: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ App start hone par token check
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("auth_token");
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  // ✅ Login method
  const login = async (token: string, mobile: string) => {
    await AsyncStorage.setItem("auth_token", token);
    await AsyncStorage.setItem("user_mobile", mobile);
    setIsLoggedIn(true);
  };

  // ✅ Logout method
  const logout = async () => {
    await AsyncStorage.removeItem("auth_token");
    await AsyncStorage.removeItem("user_mobile");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
