"use client";

import { ConversationSummary } from "@/lib/data-services";
import { TimestampFormatter } from "@/utils/timeStampFormatter";
import { Link } from "lucide-react";
import Image from "next/image";

export default function ConversationList({
  chats,
}: {
  chats: ConversationSummary[];
}) {
  return (
    <main>
      {chats?.map((chat) => (
        <div className="flex items-center gap-4 my-4" key={chat.id}>
          <div className="rounded-full w-[3rem] h-[3rem] border-1 border-black relative">
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
            <Link href={`/chat/${chat.id}`}>
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
      ))}
    </main>
  );
}
