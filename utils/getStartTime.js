import timeSlots from "@data/timeSlots";
import { addDays } from "@node_modules/date-fns/addDays";
const DAYS_MAP = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
};

export const getStartTime = (day, period) => {
  period = Number(period);

  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 7);
  const targetDayOfWeek = DAYS_MAP[day];
  const currentDayOfWeek = now.getUTCDay(); // 0=Sunday, 1=Monday...

  // หาจำนวนวันห่าง
  let daysToAdd = targetDayOfWeek - currentDayOfWeek;
  if (daysToAdd < 0) daysToAdd += 7;

  const bookingDate = addDays(now, daysToAdd);
  // กำหนดเวลาเริ่มคาบ
  const periodStartTime = timeSlots[period].from;
  const [hours, minutes] = periodStartTime.split(".").map(Number);

  bookingDate.setUTCHours(hours-7, minutes, 0, 0);
  return bookingDate;
};
