import { isPast } from "@utils/isPast";
import { isInTomorrow } from "@utils/isInTomorrow";

export const getTooltipContent = (day, period, status, user) => {
    if (status === "booked") {
        return "ห้องนี้ถูกจองแล้ว";
    } else if (status === "pending") {
        return "ห้องนี้ถูกจองแล้ว รอเช็คอิน";
    } else if (status === "mybooking") {
        return "คุณมีการจองห้องนี้";
    } else if (!user) {
        return "กรุณาเข้าสู่ระบบเพื่อจองห้อง";
    } else if (isPast(day, period)) {
        return "ไม่สามารถจองห้องในอดีตได้";
    } else if (!isInTomorrow(day)) {
        return "สามารถจองล่วงหน้าไม่เกิน 1 วัน";
    } else {
        return 'ไม่สามารถจองได้';
    }
}