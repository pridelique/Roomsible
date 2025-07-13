import { getCurrentDay, getCurrentPeriod } from "./currentDayPeriod";

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday'];
const dayIndex = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const periodIndex = ['before-school',1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'after-school'];

export const isPast = (day, period) => {
    const currentDay = days[getCurrentDay()];
    const currentPeriod = getCurrentPeriod();
    // const currentDay = days[3];
    // const currentPeriod = 5;
    period = Number(period);
    // console.log(currentDay, currentPeriod);
    // console.log(day, period);
    
    if (dayIndex.indexOf(day) < dayIndex.indexOf(currentDay)) {
        return true;
    } else if (dayIndex.indexOf(day) === dayIndex.indexOf(currentDay)) {
        if (periodIndex.indexOf(period) < periodIndex.indexOf(currentPeriod)) {            
            return true;
        }
    }
    return false;
}