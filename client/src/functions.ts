import i18next from "i18next";

export function isoToReadableString(string: string) {
  const date = new Date(string);
  const dateTimeFormat = new Intl.DateTimeFormat(i18next.language, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return dateTimeFormat.format(date);
}

export function ratingToColor(rating: number) {
  const neutralThreshold = 1;
  if (rating <= -neutralThreshold) {
    return "danger";
  }
  if (rating >= neutralThreshold) {
    return "success";
  }
  return "secondary";
}

export function groupUUIDToArrayOfImages(uuid?: string) {
  if (!uuid) {
    return [];
  }
  const numberOfImages = parseInt(uuid.split("~")[1]);
  return [...Array(numberOfImages)].map(
    (_, index) => `https://ucarecdn.com/${uuid}/nth/${index}/`
  );
}

export function getUniqueValues(array: string[]) {
  return Array.from(new Set(array));
}
