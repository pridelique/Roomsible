const buildings = {
  1 : {
    name: "เอกอำนวยการ",
    row: 4,
    col: 5,
    rooms: [
      [
        {
          roomNumber: 1404,
          name: "1404",
          status: "available",
          col_span: 1,
        },
        {
          roomNumber: 1403,
          name: "1403",
          status: "available",
          col_span: 1,
        },
        {
          roomNumber: 1402,
          name: "1402",
          status: "available",
          col_span: 1,
        },
        {
          roomNumber: 1401,
          name: "1401",
          status: "available",
          col_span: 1,
        },
        {
          roomNumber: 0,
          name: "ไม่มีห้อง",
          status: "none",
          col_span: 1,
        },
      ],
      [
        {
          roomNumber: 1305,
          name: "1305",
          status: "available",
          col_span: 1,
        },
        {
          roomNumber: 1304,
          name: "1304",
          status: "available",
          col_span: 1,
        },
        {
          roomNumber: 1303,
          name: "1303",
          status: "available",
          col_span: 1,
        },
        {
          roomNumber: 1302,
          name: "1302",
          status: "available",
          col_span: 1,
        },
        {
          roomNumber: 1301,
          name: "ดนตรีไทย",
          status: "pending",
          col_span: 1,
        },
      ],
      [
        {
          roomNumber: 1204,
          name: "ห้องแผนงาน",
          status: "booking",
          col_span: 1,
        },
        {
          roomNumber: 1203,
          name: "สำนักงานเลขาทีฯ",
          status: "unavailable",
          col_span: 1,
        },
        {
          roomNumber: 1202,
          name: "กลุ่มบริหารงบประมาณฯ",
          status: "booked",
          col_span: 2,
        },
        {
          roomNumber: 1201,
          name: "นาฏศิลป์",
          status: "unavailable",
          col_span: 1,
        },
      ],
      [
        {
          roomNumber: 1102,
          name: "ห้องพยาบาล",
          status: "booked",
          col_span: 2,
        },
        {
          roomNumber: 0,
          name: "ไม่มีห้อง",
          status: "none",
          col_span: 1,
        },
        {
          roomNumber: 1101,
          name: "ห้องประชุมเอลิซาเบธ",
          status: "pending",
          col_span: 2,
        },
      ],
    ],
  },
  2: {
    name: "ตึก 2",
    row: 4,
    col: 14,
    rooms: [
      Array.from({ length: 14 }, (_, i) => ({
        roomNumber: 2401 + i,
        name: `2${(4 - 1) * 100 + (i + 1)}`,
        status: "available",
        col_span: 1,
      })),
      Array.from({ length: 14 }, (_, i) => ({
        roomNumber: 2301 + i,
        name: `2${(3 - 1) * 100 + (i + 1)}`,
        status: "unavailable",
        col_span: 1,
      })),
      Array.from({ length: 14 }, (_, i) => ({
        roomNumber: 2201 + i,
        name: `2${(2 - 1) * 100 + (i + 1)}`,
        status: "booked",
        col_span: 1,
      })),
      Array.from({ length: 14 }, (_, i) => ({
        roomNumber: 2101 + i,
        name: `2${(1 - 1) * 100 + (i + 1)}`,
        status: "pending",
        col_span: 1,
      })),
    ],
  },
};

export default buildings;
