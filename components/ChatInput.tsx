"use client";
import { createClient } from "@/lib/supabase/client";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/lib/store/user";
import { IMessage, useMessageStore } from "@/lib/store/messages";

export default function ChatInput() {
  const user = useUser((state) => state.user);
  const addMessage = useMessageStore((state) => state.addMessage);
  // call to supabase
  const supabase = createClient();
  async function handleSendMessage(message: string) {
    if (message.trim()) {
      const newMessage = {
        id: uuidv4(),
        text: message,
        send_by: user?.id,
        is_edit: false,
        created_at: new Date().toISOString(),
        users: {
          id: user?.id,
          image_url: user?.user_metadata.avatar_url,
          created_at: user?.created_at || new Date().toISOString(),
          user_name: user?.user_metadata.user_name ?? "Anonymous",
        },
      };

      addMessage(newMessage as IMessage);
      const { error } = await supabase
        .from("messages")
        .insert({ text: message });
      if (error) {
        toast.error(error.message);
      }
    }else{
      toast.error("Message cannot be empty")
    }
  }
  return (
    <div className="p-5">
      <Input
        placeholder="send message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
