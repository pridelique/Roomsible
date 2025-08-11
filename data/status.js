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
    color: statusColors['available']
  },
  {
    statusEng: "booked",
    statusThai: "จองแล้ว",
    color: statusColors['booked']
  },
  {
    statusEng: "pending",
    statusThai: "รอยืนยัน",
    color: statusColors['pending']
  },
  {
    statusEng: "mybooking",
    statusThai: "คุณจอง",
    color: statusColors['mybooking']
  },
  {
    statusEng: "unavailable",
    statusThai: "ใช้ไม่ได้",
    color: statusColors['unavailable']
  },
];

export { statusColors, status };
