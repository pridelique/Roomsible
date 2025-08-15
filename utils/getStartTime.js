import timeSlots from "@data/timeSlots";
import { toZonedTime } from "date-fns-tz";
const DAYS_MAP = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
};

export const getStartTime = (day, period) => {
  period = Number(period);

  const now = toZonedTime(new Date(), "Asia/Bangkok");
  const targetDayOfWeek = DAYS_MAP[day];
  const currentDayOfWeek = now.getDay(); // 0=Sunday, 1=Monday...

  // หาจำนวนวันห่าง
  let daysToAdd = targetDayOfWeek - currentDayOfWeek;
  if (daysToAdd < 0) daysToAdd += 7;

  const bookingDate = new Date(now);
  bookingDate.setDate(now.getDate() + daysToAdd);

  // กำหนดเวลาเริ่มคาบ
  const periodStartTime = timeSlots[period].from;
  const [hours, minutes] = periodStartTime.split(".").map(Number);

  bookingDate.setHours(hours, minutes, 0, 0);
  return bookingDate;
};
