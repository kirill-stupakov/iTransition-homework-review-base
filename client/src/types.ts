export type colorTheme = "light" | "dark";

export interface ThemeContext {
  switchTheme: () => void;
  textColor: string;
  backgroundColor: string;
  colorTheme: colorTheme;
}

export interface UserContext {
  userObject: user;
  setUserObject: (u: user | undefined) => void;
}

export type user = {
  uuid?: string;
  name: string;
  isAdmin: boolean;
  authService?: string;
  createdAt: string;
};

export type tag = {
  name: string;
  count: number;
};

export type review = {
  id?: number;
  author: user;
  authorUUID: string;
  category: string;
  title: string;
  body: string;
  mark: number;
  rating: number;
  tags: string[];
  imageGroupUUID?: string;
  createdAt: string;
};

export type word = {
  text: string;
  value: number;
};
