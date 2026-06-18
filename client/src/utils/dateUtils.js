import dayjs from "dayjs";

// Format a MongoDB ISO date string into a readable format
export const formatEventDate = (dateString) => {
  return dayjs(dateString).format("MMMM DD, YYYY - h:mm A");
};

// Calculate difference in milliseconds for reservation countdown
export const getRemainingTime = (expiresAt) => {
  const diff = dayjs(expiresAt).diff(dayjs());
  return diff > 0 ? diff : 0;
};
