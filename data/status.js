const statusColors = {
  available: "#86EFAC", // green - soft lime pastel
  unavailable: "#D1D5DB", // gray - soft modern
  booked: "#FCA5A5", // red - light pinkish red
  mybooking: "#93C5FD", // blue - pastel blue
  pending: "#FEF08A", // yellow - warm pastel yellow
};

const status = [
  {
    statusEng: "available",
    statusThai: "ว่าง",
    color: statusColors['available'],
    thColor: 'เขียว',
    description: "ห้องว่าง สามารถจองได้"
  },
  {
    statusEng: "booked",
    statusThai: "จองแล้ว",
    color: statusColors['booked'],
    thColor: 'แดง',
    description: "ห้องนี้ถูกจองแล้ว"
  },
  {
    statusEng: "pending",
    statusThai: "รอเช็คอิน",
    color: statusColors['pending'],
    thColor: 'เหลือง',
    description: "ห้องนี้ถูกจองแล้ว รอเช็คอินเมื่อถึงคาบนั้น"
  },
  {
    statusEng: "mybooking",
    statusThai: "คุณจอง",
    color: statusColors['mybooking'],
    thColor: 'น้ำเงิน',
    description: "ห้องที่คุณจอง"
  },
  {
    statusEng: "unavailable",
    statusThai: "จองไม่ได้",
    color: statusColors['unavailable'],
    thColor: 'เทา',
    description: "ห้องนี้ไม่สามารถจองได้"
  },
];

export { statusColors, status };
