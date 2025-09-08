export interface User {
  username: string;
  email: string;
  avatar: string;
}

export type RegisterLoginRequest = {
  email: string;
  password: string;
};

export interface AuthProps {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}
