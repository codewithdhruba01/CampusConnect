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
  color?: string;
}

export interface Message {
  id: string;
  classroom_id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  user?: User;
}
