"use client";

import { IMessage, useMessageStore } from "@/lib/store/messages";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessageAction";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";

function ListMessages() {
  const { messages, addMessage, } = useMessageStore(
    (state) => state,
  );
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase
      .channel("table-db-changes") // Give your channel a unique name
      .on(
        "postgres_changes",
        {
          event: "INSERT", // Options: 'INSERT', 'UPDATE', 'DELETE', or '*' for all
          schema: "public",
          table: "messages", // The table name you enabled Realtime for
        },
        async (payload) => {
          const currentOptimisticIds = useMessageStore.getState().optimisticIds;
          if (!currentOptimisticIds.includes(payload.new.id)) {
            const { error, data } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.send_by)
              .single();
            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = { ...payload.new, users: data };
              addMessage(newMessage as IMessage);
            }
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
  return (
    <>
      <div className="space-y-7">
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
      </div>
      <DeleteAlert />
      <EditAlert />
    </>
  );
}

export default ListMessages;
