"use client"
import { createClient } from "@/lib/supabase/client";
import { Input } from "./ui/input";
import { toast } from "sonner";


export default function ChatInput() {
  async function handleSendMessage(message:string){
    // call to supabase
    const supabase = createClient();
    const {error} = await supabase.from("messages").insert({text:message})
    if (error){
      toast.error(error.message)
    }
  }
  return (
    <div className="p-5">
      <Input placeholder="send message" onKeyDown={(e)=> {
        if (e.key === "Enter"){
          handleSendMessage(e.currentTarget.value);
          e.currentTarget.value = "";
        }
      }} />
    </div>
  );
}
