import { ConversationSummary } from "@/lib/data-services";
import Conversation from "./Conversation";

export default function ConversationList({chats}: {chats: ConversationSummary[]}) {
  return (
    <div className="m-6">
      {chats.map(chat => <Conversation chat={chat} key={chat.id} />)}
    </div>
  )
}