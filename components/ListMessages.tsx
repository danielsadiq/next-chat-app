"use client";

import { useMessageStore } from "@/lib/store/messages";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessageAction";

function ListMessages() {
  const messages = useMessageStore((state) => state.messages);
  return (
    <>
      <div className="space-y-7">
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
      </div>
      <DeleteAlert />
      <EditAlert />
    </>
  );
}

export default ListMessages;
