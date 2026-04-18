"use client"
import { Input } from "./ui/input";

export default function ChatInput() {
  function handleSendMessage(message:string){
    alert(message);
  }
  return (
    <div className="p-5">
      <Input placeholder="send message" onKeyDown={(e)=> {
        if (e.key === "Enter"){
          handleSendMessage(e.currentTarget.value);
        }
      }} />
    </div>
  );
}
