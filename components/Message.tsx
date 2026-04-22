import { IMessage } from "@/lib/store/messages";
import Image from "next/image";

function Message({ message }: { message: IMessage }) {
  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.users!.image_url}
          alt={message.users?.user_name || "User"}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h1 className="font-bold">{message.users?.user_name}</h1>
          <h1 className="text-sm text-gray-400">
            {new Date(message.created_at).toDateString()}
          </h1>
        </div>
        <p className="text-gray-600">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
