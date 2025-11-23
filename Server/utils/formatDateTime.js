const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDateWithMicroseconds = (date, timeZone = "Asia/Kolkata") => {
  // Use dayjs to parse the date as UTC
  const parsedDate = dayjs.utc(date).tz(timeZone);

  // Format the date part with milliseconds
  const formattedDate = parsedDate.format("YYYY-MM-DD HH:mm:ss.SSS");

  // Get microseconds by multiplying the milliseconds part by 1000
  const microseconds =
    parsedDate.millisecond().toString().padStart(3, "0") + "000";

  return `${formattedDate}${microseconds}`;
};

module.exports = {
  formatDateWithMicroseconds,
};
