import { getCurrentDay } from "./currentDayPeriod";
import { toZonedTime } from "date-fns-tz";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const dayIndex = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export const inInTomorrow = (day) => {
  // console.log(getCurrentDay())
  let currentDay = days[getCurrentDay()];
  const now = toZonedTime(new Date(), "Asia/Bangkok"); // console.log(now.getHours());
  if (now.getHours() < 6) {
    currentDay = days[(getCurrentDay() + 6) % 7];
  }
  // console.log(currentDay);

  let dayToAdd = dayIndex.indexOf(day) - dayIndex.indexOf(currentDay);
  if (dayToAdd >= 2) {
    return false;
  }

  // console.log(dayToAdd);

  return true;
};
