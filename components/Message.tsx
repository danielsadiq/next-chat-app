import { IMessage, useMessageStore } from "@/lib/store/messages";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
import { useUser } from "@/lib/store/user";

function Message({ message }: { message: IMessage }) {
  const user = useUser((state) => state.user);
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h1 className="font-bold">{message.users?.user_name}</h1>
            <h1 className="text-sm text-gray-400">
              {new Date(message.created_at).toDateString()}
            </h1>
          </div>
          {user && message.users?.id === user.id && (
            <MessageMenu message={message} />
          )}
        </div>
        <p className="text-gray-600">{message.text}</p>
      </div>
    </div>
  );
}

function MessageMenu({ message }: { message: IMessage }) {
  const setActionMessage = useMessageStore((state) => state.setActionMessage);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              document.getElementById("trigger-edit")?.click();
              setActionMessage(message);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              document.getElementById("trigger-delete")?.click();
              setActionMessage(message);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Message;
