export const formatDate = (timezone: string, date?: string) => {
  const dateObj = date ? new Date(date) : new Date();

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
};
