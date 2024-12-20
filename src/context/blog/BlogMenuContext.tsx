"use client";

import { BlogMenuKey } from "@/types";
import { createContext, useContext, useState } from "react";

interface BlogMenuContextType {
  activeKey: BlogMenuKey | "";
  setActiveKey: (key: BlogMenuKey | "") => void;
}

const BlogMenuContext = createContext<BlogMenuContextType | "">("");

export function useBlogMenuContext() {
  const context = useContext(BlogMenuContext);

  if (!context) {
    throw new Error(
      "useBlogMenuContext must be used within BlogMenuContextProvider"
    );
  }

  return context;
}

export default function BlogMenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeKey, setActiveKey] = useState<BlogMenuKey | "">("");

  return (
    <BlogMenuContext.Provider value={{ activeKey, setActiveKey }}>
      {children}
    </BlogMenuContext.Provider>
  );
}
