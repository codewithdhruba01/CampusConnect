export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export interface Classroom {
  id: string;
  name: string;
  description?: string;
  category?: string;
  profile_pic?: string;
  created_at: string;
  created_by: string;
  members_count: number;
  members?: User[];
  color?: string;
}

export interface Message {
  id: string;
  classroom_id: string;
  user_id: string;
  content: string;
  attachment?: {
    type: "image" | "document" | "audio" | "contact" | "poll";
    url?: string;
    name?: string;
    size?: number;
    pollData?: {
      question: string;
      options: { text: string; votes: number }[];
      allowMultipleAnswers?: boolean;
    };
  };
  created_at: string;
  user?: User;
}
