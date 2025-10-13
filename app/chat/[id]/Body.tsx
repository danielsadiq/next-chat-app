"use client";

import { useEffect, useState } from "react";
import { getMessages } from "@/lib/dataServices";
import { subscribeToMessages } from "@/lib/services";

export default function Body({ convoId }: { convoId: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const msgs = await getMessages(convoId);
      setMessages(msgs);
    }
    fetchMessages();
    const unsubscribe = subscribeToMessages(convoId, (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // 3️⃣ Cleanup
    return unsubscribe;
  }, [convoId]);

  return (
    <div className="flex flex-col gap-2 p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="p-2 rounded bg-gray-100">
          <strong>{msg.sender?.display_name || "Unknown"}:</strong>{" "}
          {msg.content}
        </div>
      ))}
    </div>
  );
}
