export const apiURI = process.env.REACT_APP_API_URI;

export type tag = {
  text: string;
  value: number;
};

export type user = {
  name: string;
  karma: number;
  reviews: number;
  isAdmin: boolean;
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
