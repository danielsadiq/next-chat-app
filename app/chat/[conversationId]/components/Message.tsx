import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageType } from "@/types";

export default function Message({
  msg,
  isMine,
}: {
  msg: MessageType;
  isMine: boolean;
}) {
  return (
    <div
      key={msg.id}
      className={`flex relative ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm group ${
          isMine
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-white text-gray-900 rounded-bl-none"
        }`}
      >
        {/* Sender name for group chats */}
        {!isMine && (
          <p className="text-xs text-gray-500 mb-1">
            {msg.sender?.display_name || "Unknown"}
          </p>
        )}
        <p className="break-words">{msg.content}</p>

        {/* Timestamp */}
        <p
          className={`text-[10px] mt-1 ${
            isMine ? "text-green-100" : "text-gray-400"
          } text-right`}
        >
          {new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      {isMine && (
        <div className="absolute top-1 right-1 opacity-100 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 cursor-pointer hover:bg-transparent"
              >
                <MoreVertical className="h-4 w-4 text-gray-300 hover:text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => onEdit(msg)}
                className="cursor-pointer"
              >
                <Pencil className="h-4 w-4 mr-2 text-gray-600" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(msg.id)}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
