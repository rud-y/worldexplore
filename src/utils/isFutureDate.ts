export const isFutureDate = (dateVal?: string | Date | null): boolean => {
  if (!dateVal) return false;
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return false;

  return d.getTime() > Date.now();
};
