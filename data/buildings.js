const buildings = {
  1 : {
    name: "เอกอำนวยการ",
    row: 4,
    col: 5,
    rooms: [
      [
        {
          number: 1404,
          name: "ห้องเรียน 1404",
          status: "available",
          col_span: 1,
        },
        {
          number: 1403,
          name: "ห้องเรียน 1403",
          status: "available",
          col_span: 1,
        },
        {
          number: 1402,
          name: "ห้องเรียน 1402",
          status: "available",
          col_span: 1,
        },
        {
          number: 1401,
          name: "ห้องเรียน 1401",
          status: "available",
          col_span: 1,
        },
        {
          number: 0,
          name: "ไม่มีห้อง",
          status: "none",
          col_span: 1,
        },
      ],
      [
        {
          number: 1305,
          name: "ห้องเรียน 1305",
          status: "available",
          col_span: 1,
        },
        {
          number: 1304,
          name: "ห้องเรียน 1304",
          status: "available",
          col_span: 1,
        },
        {
          number: 1303,
          name: "ห้องเรียน 1303",
          status: "available",
          col_span: 1,
        },
        {
          number: 1302,
          name: "ห้องเรียน 1302",
          status: "available",
          col_span: 1,
        },
        {
          number: 1301,
          name: "ดนตรีไทย",
          status: "pending",
          col_span: 1,
        },
      ],
      [
        {
          number: 1204,
          name: "ห้องแผนงาน",
          status: "booking",
          col_span: 1,
        },
        {
          number: 1203,
          name: "สำนักงานเลขาทีฯ",
          status: "unavailable",
          col_span: 1,
        },
        {
          number: 1202,
          name: "กลุ่มบริหารงบประมาณฯ",
          status: "booked",
          col_span: 2,
        },
        {
          number: 1201,
          name: "นาฏศิลป์",
          status: "unavailable",
          col_span: 1,
        },
      ],
      [
        {
          number: 1102,
          name: "ห้องพยาบาล",
          status: "booked",
          col_span: 2,
        },
        {
          number: 0,
          name: "ไม่มีห้อง",
          status: "none",
          col_span: 1,
        },
        {
          number: 1101,
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
        number: 2401 + i,
        name: `ห้องเรียน 2${(4 - 1) * 100 + (i + 1)}`,
        status: "available",
        col_span: 1,
      })),
      Array.from({ length: 14 }, (_, i) => ({
        number: 2301 + i,
        name: `ห้องเรียน 2${(3 - 1) * 100 + (i + 1)}`,
        status: "unavailable",
        col_span: 1,
      })),
      Array.from({ length: 14 }, (_, i) => ({
        number: 2201 + i,
        name: `ห้องเรียน 2${(2 - 1) * 100 + (i + 1)}`,
        status: "booked",
        col_span: 1,
      })),
      Array.from({ length: 14 }, (_, i) => ({
        number: 2101 + i,
        name: `ห้องเรียน 2${(1 - 1) * 100 + (i + 1)}`,
        status: "pending",
        col_span: 1,
      })),
    ],
  },
};

export default buildings;
