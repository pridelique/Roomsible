const navLink = [
    {
        label : 'หน้าหลัก',
        name : 'main',
        path : '/',
        session : false,
    },
    {
        label : 'ตึก',
        name : 'building',
        path : '/building',
        session : false,
    },
    {
        label : 'เช็คอิน',
        name : 'checkin',
        path : '/checkin',
        session : true,
    },
    {
        label : 'ประวัติ',
        name : 'history',
        path : '/history',
        session : true,
    },
]

export default navLink;