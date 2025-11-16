export const getDateString = function (date) {
  return date.toISOString().split("T")[0];
};

export const getFormattedDate = function (date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getWeekDates = function (date) {
  const dates = [];
  const current = new Date(date);

  // Get the day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = current.getDay();

  // Calculate days to subtract to get to Monday
  // If Sunday (0), go back 6 days; otherwise go back (dayOfWeek - 1) days
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Set to Monday of the week
  const monday = new Date(current);
  monday.setDate(current.getDate() - daysToMonday);

  // Generate array of 7 dates (Monday to Sunday)
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    dates.push(day);
  }

  return dates;
};
