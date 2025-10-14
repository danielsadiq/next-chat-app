export interface UserType {
  about: string;
  avatar_url: string;
  created_at: string;
  display_name: string;
  email: string;
  id: string;
  status: string;
}

export interface NewMessageType {
  id?:string;
  conversation_id: string;
  sender_id:string;
  content:string;
  type:string;
  attachment?: string | null
  is_deleted?: boolean;
  created_at?: string;
  edited_at?: string;
}

export interface MessageType {
  id: string,
    conversation_id: string,
    sender_id: string,
    content: string,
    type: string,
    attachment_url: string | null,
    is_deleted: boolean,
    created_at: string,
    edited_at: string | null,
    sender: {
      id: string,
      avatar_url: string,
      display_name: string,
    }
}