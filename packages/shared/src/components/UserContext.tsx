"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

/**
 * Cross-zone user state via cookies.
 * Since each zone is a separate Next.js app on the same domain,
 * cookies are shared across all zones — enabling simple state integration.
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("mz_user="));
    if (cookie) {
      try {
        setUserState(JSON.parse(decodeURIComponent(cookie.split("=")[1])));
      } catch {}
    }
  }, []);

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) {
      document.cookie = `mz_user=${encodeURIComponent(JSON.stringify(u))}; path=/; max-age=86400`;
    } else {
      document.cookie = "mz_user=; path=/; max-age=0";
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
