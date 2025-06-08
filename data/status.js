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
    statusThai: "ว่าง",
    color: statusColors['available']
  },
  {
    statusEng: "unavailable",
    statusThai: "ไม่ว่าง",
    color: statusColors['unavailable']
  },
  {
    statusEng: "booked",
    statusThai: "จองแล้ว",
    color: statusColors['booked']
  },
  {
    statusEng: "booking",
    statusThai: "คุณจอง",
    color: statusColors['booking']
  },
  {
    statusEng: "pending",
    statusThai: "รอยืนยัน",
    color: statusColors['pending']
  },
];

export { statusColors, status };
