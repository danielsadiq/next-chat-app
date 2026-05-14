"use client";

import { useMessageStore } from "@/lib/store/messages";
import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function ChatPresence() {
  const user = useUser((state) => state.user);
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase.channel("room_1", {
      config: {
        presence: {
          key: user?.id, // Use the user's ID as the unique key
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        // This runs whenever anyone joins or leaves
        const newState = channel.presenceState();

        // Flatten the state to get a list of unique users
        // (Presence can have multiple entries if a user has multiple tabs open)
        const onlineIds = Object.keys(newState);
        useMessageStore.getState().setOnlineUsers(onlineIds);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("User joined:", key);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("User left:", key);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // "Track" tells Supabase to announce your presence to everyone else
          await channel.track({
            user_id: user?.id,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user]);
  const onlineUsers = useMessageStore((state) => state.onlineUsers);
  if (!user) {
    return <div className="h-3 w-1"></div>;
  }
  return (
    <div className="flex items-center gap-1">
      <div className="h-4 w-4 bg-green-500 animate-pulse rounded-full"></div>
      <h1 className="text-sm text-gray-400">{onlineUsers.length} online</h1>
    </div>
  );
}
