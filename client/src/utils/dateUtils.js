import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Format a MongoDB ISO date string into a readable format
export const formatEventDate = (dateTime) => {
  return dayjs(dateTime).format("dddd, D MMMM YYYY · h:mm A");
};

export const formatExpiresAt = (expiresAt) => {
  return dayjs(expiresAt).format("[Expires at] h:mm A");
};

export const timeFromNow = (dateTime) => {
  return dayjs(dateTime).fromNow();
};

// Calculate difference in milliseconds for reservation countdown
export const getRemainingTime = (expiresAt) => {
  const diff = dayjs(expiresAt).diff(dayjs());
  return diff > 0 ? diff : 0;
};

