// URL base de tu backend
export const API_BASE_URL = 'http://localhost:3000';

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};


export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}
export interface LoginResponse {
  message: string;
  token?: string; 
  user: User;
}