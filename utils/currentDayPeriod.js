// import { timeSlots } from "@data";

const timeSlots = [
    { from: '08.00', to: '08.30', label: 'Homeroom' },   // Homeroom
    { label: 1, from: '08.30', to: '09.20' },   // 1
    { label: 2, from: '09.20', to: '10.10' },   // 2
    { label: 3, from: '10.10', to: '11.00' },   // 3
    { label: 4, from: '11.00', to: '11.50' },   // 4
    { label: 5, from: '11.50', to: '12.40' },   // 5
    { label: 6, from: '12.40', to: '13.30' },   // 6
    { label: 7, from: '13.30', to: '14.20' },   // 7
    { label: 8, from: '14.20', to: '15.10' },   // 8
    { label: 9, from: '15.10', to: '16.00' },   // 9
    { label: 10, from: '16.00', to: '16.50' },   // 10
];


export const getCurrentDay = () => {
  const today = new Date();
  const day = today.getDay();
  return day;
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
