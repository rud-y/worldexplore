export const formatDate = (date?: string | Date | null) => {
  if (!date) return "Unknown date";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "Unknown date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(d);
};
