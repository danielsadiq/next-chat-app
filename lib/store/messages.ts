// @/store/useMessageStore.ts
import { create } from "zustand";
export type IMessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: {
    image_url: string;
    created_at: string;
    user_name: string;
    id: string;
  } | null;
};

interface MessageState {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  addMessage: (message:IMessage) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({messages: [...state.messages, message]}))
}));
