"use client"

import { UserProvider, useUser } from "@/context/UserContext";
import { getUser } from "@/lib/api-users";
import { useEffect } from "react";

const email = "daniel@example.com"

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  function ChatInitializer() {
  const { setUser } = useUser();

  useEffect(() => {
    async function getMyUser(){
      const data = await getUser(email);
      setUser(data)
    }
    getMyUser();
  }, [setUser]);

  return null; // doesn’t render anything visible
}

  return (
    <UserProvider>
      <ChatInitializer/>
      <div className="flex h-screen">
        {children}
      </div>
    </UserProvider>
  );
}