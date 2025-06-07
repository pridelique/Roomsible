const statusColors = {
  available: "#86EFAC", // green - soft lime pastel
  unavailable: "#D1D5DB", // gray - soft modern
  booked: "#FCA5A5", // red - light pinkish red
  booking: "#93C5FD", // blue - pastel blue
  pending: "#FEF08A", // yellow - warm pastel yellow
};

const status = [
  {
    statusEng: "available",
    statusThai: "ห้องว่าง",
    color: statusColors['available']
  },
  {
    statusEng: "unavailable",
    statusThai: "ห้องที่ไม่สามารถจองได้",
    color: statusColors['unavailable']
  },
  {
    statusEng: "booked",
    statusThai: "ห้องที่ถูกจองไว้แล้ว",
    color: statusColors['booked']
  },
  {
    statusEng: "booking",
    statusThai: "ห้องที่คุณจองไว้",
    color: statusColors['booking']
  },
  {
    statusEng: "pending",
    statusThai: "ห้องที่รอดำเนินการ",
    color: statusColors['pending']
  },
];

export { statusColors, status };
