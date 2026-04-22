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
  actionMessage: IMessage|undefined;
  addMessage: (message:IMessage) => void;
  setActionMessage: (message:IMessage|undefined) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  actionMessage: undefined,
  addMessage: (message) => set((state) => ({messages: [...state.messages, message]})),
  setActionMessage: (message) => set(() => ({actionMessage: message})),
}));
