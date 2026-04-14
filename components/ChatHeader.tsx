'use client'

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";

export default function ChatHeader() {
  async function handleLoginWithGithub(){
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

  }
  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Daily Chat</h1>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-500 animate-pulse rounded-full"></div>
            <h1 className="text-sm text-gray-400">3 online</h1>
          </div>
        </div>
        <Button onClick={handleLoginWithGithub}>Login</Button>
      </div>
    </div>
  );
}
