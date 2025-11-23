// import { format, parseISO } from 'date-fns';

// export const formatDateToWords = (dateString) => {
//   const date = parseISO(dateString);
//   return format(date, 'EEE, MMMM yyyy \'at\' h:mm a');
// };

export const formatDateToWords = (dateString) => {
  const date = new Date(dateString);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()]; // Use getDay() to get the local day of the week
  const month = monthsOfYear[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${dayOfWeek}, ${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
};
