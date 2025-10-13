"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface User {
  id: string;
  email:string;
  display_name?: string;
  avatar_url?: string; 
}

interface UserContextType {
  user: User | null;
  setUser?: (user: User | null) => void;
}

const UserContext = createContext({} as UserContextType);

export function UserProvider({children}: {children:ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}