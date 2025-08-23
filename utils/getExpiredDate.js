import { getStartTime } from "./getStartTime";

const getExpiredDate = (day, period) => {
  const nowPlus10 = new Date(new Date().getTime() + 10 * 60 * 1000);

  // สมมติ bookingStart คือเวลาเริ่มคาบ
  const bookingStart = getStartTime(day, period);
  bookingStart.setMinutes(bookingStart.getMinutes() + 10);

  const maxTime = Math.max(bookingStart.getTime(), nowPlus10.getTime());
  const expired_at = new Date(maxTime);
  expired_at.setUTCHours(expired_at.getUTCHours() + 7);

  return expired_at;
};

export default getExpiredDate;
