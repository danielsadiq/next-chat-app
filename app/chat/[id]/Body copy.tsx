"use client";

import { useEffect, useRef, useState } from "react";
import { getMessages } from "@/lib/data-services";
import { subscribeToMessages } from "@/lib/services";

export default function Body({ convoId }: { convoId: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const id = "70e1f191-8802-4379-a7d4-382fcee331cc"

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
     <div className="flex flex-col gap-3 p-4 bg-gray-50">
      {messages.map((msg) => {
        const isMine = msg.sender_id === id;

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
      <MessageBar messages={messages} />
    </div>
  );
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MessageBar({messages}: {messages: any[]}){
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const content = inputRef.current?.value?.trim();
    if (!content) return;
    // onSendMessage(content);
    inputRef.current!.value = "";
  };
  return <form
        onSubmit={handleSend}
        className="sticky bottom-0 flex items-center gap-2 bg-white p-3 border-t border-gray-200"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
}