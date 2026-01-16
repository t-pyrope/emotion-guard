export const getHourAsNumber = (timezone: string, date?: string) => {
  const dateObj = date ? new Date(date) : new Date();

  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      hour12: false,
    }).format(dateObj),
  );
};
