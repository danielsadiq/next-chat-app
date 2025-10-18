import { ConversationSummary } from "@/lib/data-services";
import { TimestampFormatter } from "@/utils/timeStampFormatter";
import Image from "next/image";
import Link from "next/link";

export default function Conversation({chat}: {chat: ConversationSummary}) {
  return (
    <div className="flex items-center gap-4 my-4" key={chat.id}>
          <div className="rounded-full w-12 h-12 border-1 border-black relative">
            {chat?.avatar_url ? (
              <Image
                src={chat.avatar_url}
                alt="User avatar"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
                {chat?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
          </div>
          <div className="flex-1">
            <Link href={{
              pathname: `/chat/${chat.id}`,
              query: {
                name: chat.name,
                image: chat.avatar_url,
              }
              }}>
              <h2 className="font-bold">{chat.name}</h2>
            </Link>
            <p>{chat.lastMessage?.content}</p>
          </div>
          <div className="ml-auto">
            <span>
              {TimestampFormatter.format(
                chat.lastMessage?.timestamp ?? "today"
              )}
            </span>
          </div>
        </div>
  )
}