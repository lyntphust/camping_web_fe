"use client";

import { generateRandomString } from "@/util";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  accessToken: string | null;
  userInfo: any;
  chatbotSessionId: string | null;
  updateAccessToken: (token: string | null) => void;
  updateUserInfo: (info: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [chatbotSessionId, setChatbotSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const randomId = generateRandomString();

      const token = localStorage.getItem("access_token");
      const user = localStorage.getItem("user_info");
      const chatbotSessionId = localStorage.getItem("chatbot_session_id");
      setAccessToken(token);
      setUserInfo(user ? JSON.parse(user) : null);
      setChatbotSessionId(chatbotSessionId || randomId);
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
    const randomId = generateRandomString();
    setChatbotSessionId(info ? info.id.toString() : randomId);
    if (typeof window !== "undefined" && window.localStorage) {
      if (info) {
        localStorage.setItem("user_info", JSON.stringify(info));
        localStorage.setItem("chatbot_session_id", info.id);
      } else {
        localStorage.removeItem("user_info");
        localStorage.setItem("chatbot_session_id", randomId);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userInfo,
        chatbotSessionId,
        updateAccessToken,
        updateUserInfo,
      }}
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
