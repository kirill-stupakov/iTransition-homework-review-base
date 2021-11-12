export const apiURI = "http://localhost:5000/";

export type tag = {
  text: string;
  value: number;
};

export type user = {
  name: string;
  karma: number;
  isAdmin: boolean;
  createdAt: string;
};
