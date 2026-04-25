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
  optimisticDeleteMessage: (messageId:string) => void;
  setActionMessage: (message:IMessage|undefined) => void;
  optimisticUpdateMessage: (messageId:string, newText:string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  actionMessage: undefined,
  addMessage: (message) => set((state) => ({messages: [...state.messages, message]})),
  optimisticDeleteMessage: (messageId) => set((state) => ({
    messages: state.messages.filter((m) => m.id !== messageId)
  })),
  optimisticUpdateMessage: (messageId, newText) => set((state) => ({
    messages: state.messages.map((m) => 
      m.id === messageId ? { ...m, text: newText, is_edit: true } : m
    )
  })),
  setActionMessage: (message) => set(() => ({actionMessage: message})),
}));
