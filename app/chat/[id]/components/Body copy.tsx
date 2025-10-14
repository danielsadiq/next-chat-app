/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { getMessages } from "@/lib/data-services";
import { subscribeToMessages } from "@/lib/services";
import { motion, AnimatePresence } from "framer-motion";

export default function Body({ convoId }: { convoId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function fetchMessages() {
      const msgs = await getMessages(convoId);
      setMessages(msgs);
    }

    fetchMessages();

    const unsubscribe = subscribeToMessages(convoId, {
      onInsert: (newMsg) =>
        setMessages((prev) => [...prev, { ...newMsg, _new: true }]),
      onUpdate: (updatedMsg) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === updatedMsg.id ? updatedMsg : m))
        ),
      onDelete: (deletedMsg) =>
        setMessages((prev) => prev.filter((m) => m.id !== deletedMsg.id)),
    });

    return unsubscribe;
  }, [convoId]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-2">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`p-2 rounded-md max-w-[70%] ${
              msg.isMine
                ? "self-end bg-green-100 text-right"
                : "self-start bg-gray-100 text-left"
            }`}
          >
            <strong className="block text-sm text-gray-700">
              {msg.sender?.display_name || "Unknown"}
            </strong>
            <p className="text-gray-900">{msg.content}</p>
          </motion.div>
        ))}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </div>
  );
}
