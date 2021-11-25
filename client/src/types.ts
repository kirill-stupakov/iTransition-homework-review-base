export const apiURI = process.env.REACT_APP_API_URI!;

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
  createdAt: string;
};

export function isoToReadableString(string: string) {
  const date = new Date(string);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return dateTimeFormat.format(date);
}

export function ratingToColor(rating: number) {
  const neutralThreshold = 5;
  if (rating < -neutralThreshold) {
    return "danger";
  }
  if (Math.abs(rating) <= neutralThreshold) {
    return "secondary";
  }
  return "success";
}
