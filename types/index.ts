export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Ensiklopedia {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}