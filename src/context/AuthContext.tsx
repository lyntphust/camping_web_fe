"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  accessToken: string | null;
  userInfo: any;
  updateAccessToken: (token: string | null) => void;
  updateUserInfo: (info: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("access_token");
      const user = localStorage.getItem("user_info");
      setAccessToken(token);
      setUserInfo(user ? JSON.parse(user) : null);
    }
  }, []);

  const updateAccessToken = (token: string | null) => {
    setAccessToken(token);
    if (typeof window !== "undefined" && window.localStorage) {
      if (token) {
        localStorage.setItem("access_token", token);
      } else {
        localStorage.removeItem("access_token");
      }
    }
  };

  const updateUserInfo = (info: any) => {
    setUserInfo(info);
    if (typeof window !== "undefined" && window.localStorage) {
      if (info) {
        localStorage.setItem("user_info", JSON.stringify(info));
      } else {
        localStorage.removeItem("user_info");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, userInfo, updateAccessToken, updateUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
