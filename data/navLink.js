import { home, home_selected, building, building_selected, checkin, checkin_selected, history, history_selected } from "@public/assets/icons";
const navLink = [
    {
        label : 'หน้าแรก',
        path : '/',
        session : false,
        icon : home,
        selectedIcon : home_selected,
    },
    {
        label : 'ตึก',
        path : '/building',
        session : false,
        icon : building,
        selectedIcon : building_selected,
    },
    {
        label : 'เช็คอิน',
        path : '/checkin',
        session : true,
        icon : checkin,
        selectedIcon : checkin_selected,
    },
    {
        label : 'ประวัติ',
        path : '/history',
        session : true,
        icon : history,
        selectedIcon : history_selected,
    },
]

export default navLink;