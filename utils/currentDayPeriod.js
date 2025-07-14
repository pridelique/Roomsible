import timeSlots from "@data/timeSlots";

const dayEn = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const dayTh = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];

export const getCurrentDay = (type = 'index') => {
  const today = new Date();
  const day = today.getDay();
  if (type === 'index') return day;
  else if (type === 'eng') return dayEn[day];
  return dayTh[day];
};

export const getCurrentPeriod = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const currentTime = hours * 60 + minutes;
  const [startSchoolHour, startSchoolMinute] = timeSlots[1].from
    .split(".")
    .map(Number);
  const startSchoolTime = startSchoolHour * 60 + startSchoolMinute;
  if (currentTime < startSchoolTime) {
    return 'before-school'; // School hasn't started yet
  }
  if (currentTime)
    for (let i = 1; i < timeSlots.length; i++) {
      const slot = timeSlots[i];
      const [startHour, startMinute] = slot.from.split(".").map(Number);
      const [endHour, endMinute] = slot.to.split(".").map(Number);

      const startTime = startHour * 60 + startMinute;
      const endTime = endHour * 60 + endMinute;

      if (currentTime >= startTime && currentTime <= endTime) {
        return slot.label;
      }
    }
  return 'after-school'; // After school hours
};
