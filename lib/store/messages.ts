// @/store/useMessageStore.ts
import { create } from "zustand";
import { LIMIT_MESSAGE } from "../constant";
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
  onlineUsers: string[]; // 👈 Add this
  setOnlineUsers: (users: string[]) => void; // 👈 And this
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void; // Add this
  page: number;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  setMessageforPage: (messages: IMessage[]) => void;
  setOptimisticId: (id:string) => void;
  optimisticIds: string[];
  actionMessage: IMessage|undefined;
  addMessage: (message:IMessage) => void;
  optimisticDeleteMessage: (messageId:string) => void;
  setActionMessage: (message:IMessage|undefined) => void;
  optimisticUpdateMessage: (messageId:string, newText:string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setHasMore: (hasMore) => set({ hasMore }),
  hasMore: true,
  page: 1,
  messages: [],
  optimisticIds: [],
  setOptimisticId: (id) => set((state) => ({optimisticIds: [...state.optimisticIds, id]})),
  setMessageforPage: (messages) => set((state) => ({messages: [...messages, ...state.messages, ], page: state.page + 1, hasMore: messages.length >=LIMIT_MESSAGE})),
  setMessages: (messages) => set({ messages }),
  actionMessage: undefined,
  addMessage: (message) => set((state) => ({messages: [...state.messages, message]})),
  optimisticDeleteMessage: (messageId) => set((state) => ({
    messages: state.messages.filter((m) => m.id !== messageId)
  })),
  optimisticUpdateMessage: (messageId, newText) => set((state) => ({
    messages: state.messages.map((m) => 
      m.id === messageId ? { ...m, text: newText, is_edit: m.text !== newText } : m
    )
  })),
  setActionMessage: (message) => set(() => ({actionMessage: message})),
}));
