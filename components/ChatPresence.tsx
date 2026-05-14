"use client";

import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function ChatPresence() {
  const user = useUser((state) => state.user);
  const supabase = createClient();
  
  // 1. Move to local state
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    // Prevent tracking if there is no user
    if (!user) return;

    const channel = supabase.channel("room_1", {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState();
        // 2. Update local state instead of Zustand
        const onlineIds = Object.keys(newState);
        setOnlineCount(onlineIds.length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user, supabase]);

  // If no user, show a placeholder or nothing
  if (!user) {
    return <div className="h-3 w-1"></div>;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 bg-green-500 animate-pulse rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      <h1 className="text-sm text-gray-400 font-medium">
        {onlineCount} {onlineCount === 1 ? "person" : "people"} online
      </h1>
    </div>
  );
}