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

export function isoToReadableString(string: string) {
  const date = new Date(string);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return dateTimeFormat.format(date);
}
