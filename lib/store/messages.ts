// @/store/useMessageStore.ts
import { create } from 'zustand';
export type IMessage = {
    created_at: string;
    id: number;
    is_edit: boolean;
    send_by: string;
    text: string;
    users: {
        created_at: string;
        id: string;
        image_url: string;
        user_name: string;
    } | null
}

interface MessageState {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
}));