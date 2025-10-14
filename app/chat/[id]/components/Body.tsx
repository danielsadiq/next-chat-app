import { getMessages } from "@/lib/data-services";
import MessageList from "./MessageList";
import { getCurrentUser } from "@/lib/auth";

export default async function Body({ convoId }: { convoId: string }) {
  const messages = await getMessages(convoId);
  const user = await getCurrentUser();
  return (
    <MessageList user={user} messages={messages} convoId={convoId} />
  );
}


