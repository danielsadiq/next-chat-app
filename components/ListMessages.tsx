"use client";

import { IMessage, useMessageStore } from "@/lib/store/messages";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessageAction";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

function ListMessages() {
  const scrollRef = useRef<HTMLDivElement>(null); // Create the Ref
  const { messages, addMessage, optimisticUpdateMessage, optimisticDeleteMessage } = useMessageStore((state) => state);
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase
      .channel("table-db-changes") // Give your channel a unique name
      .on(
        "postgres_changes",
        {
          event: "*", // Options: 'INSERT', 'UPDATE', 'DELETE', or '*' for all
          schema: "public",
          table: "messages", // The table name you enabled Realtime for
        },
        async (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;
          switch (eventType) {
            case "INSERT":
              const currentOptimisticIds =
                useMessageStore.getState().optimisticIds;
              if (!currentOptimisticIds.includes(newRecord.id)) {
                const { error, data } = await supabase
                  .from("users")
                  .select("*")
                  .eq("id", newRecord.send_by)
                  .single();
                if (error) {
                  toast.error(error.message);
                } else {
                  const newMessage = { ...newRecord, users: data };
                  addMessage(newMessage as IMessage);
                }
              }
            case "UPDATE":
              optimisticUpdateMessage(newRecord.id, newRecord.text);
              break
            case "DELETE":
              optimisticDeleteMessage(oldRecord.id);
              break;
          }
        },
      )

      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Ready to receive updates!");
        }
      });
    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    // Whenever messages change, scroll the anchor into view
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Trigger this every time the messages array updates
  return (
    <>
      <div className="space-y-7 overflow-y-auto">
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
        <div ref={scrollRef} />
      </div>
      <DeleteAlert />
      <EditAlert />
    </>
  );
}

export default ListMessages;
