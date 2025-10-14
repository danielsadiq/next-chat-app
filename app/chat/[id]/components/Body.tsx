"use client";

import { useEffect, useState } from "react";
import { subscribeToMessages } from "@/lib/services";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";

export default function Body({ convoId }: { convoId: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*, sender:profiles(display_name)")
        .eq("conversation_id", convoId)
        .order("created_at", { ascending: true });

      if (!error) setMessages(data || []);
    }

    fetchMessages();

    // ✅ Realtime subscription
    const unsubscribe = subscribeToMessages(convoId, (newMessage) =>setMessages((prev) =>[...prev, newMessage]))

    return unsubscribe;
  }, [convoId]);

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50">
      {messages.map((msg) => {
        const isMine = msg.sender_id === user?.id;

        return (
          <div
            key={msg.id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                isMine
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none"
              }`}
            >
              {/* Sender name for group chats */}
              {!isMine && (
                <p className="text-xs text-gray-500 mb-1">
                  {msg.sender?.display_name || "Unknown"}
                </p>
              )}
              <p className="break-words">{msg.content}</p>

              {/* Timestamp */}
              <p
                className={`text-[10px] mt-1 ${
                  isMine ? "text-green-100" : "text-gray-400"
                } text-right`}
              >
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}


