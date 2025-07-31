import { isInTorrorrow } from "./isInTomorrow";
import { isPast } from "./isPast";

export const isBookable = (day, period, role, type = 'display') => {
    if (!day || !period || !role) return false;
    // console.log(day, period, role, type);
    period = Number(period);
    if (type === 'display') {
        if (role === 'student') {
            if (isPast(day, period) || !isInTorrorrow(day)) return false;
        } else {
            if (isPast(day, period)) return false;
        }
    } else if (type === 'class') {
        if (role === 'student') {
            return false;
        } else {
            if (isPast(day, period)) return false;
        }
    } else if (type === 'activity') {
        if (role !== 'admin' && (isPast(day, period) || !isInTorrorrow(day))) {
            return false;
        }
    }
    return true;
}