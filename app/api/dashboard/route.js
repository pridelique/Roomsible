import { NextResponse } from "@node_modules/next/server";
import { supabase } from "@utils/supabase";
import { google } from "googleapis";

const monthNames = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const days = [
  { label: "วันจันทร์", value: "monday" },
  { label: "วันอังคาร", value: "tuesday" },
  { label: "วันพุธ", value: "wednesday" },
  { label: "วันพฤหัสบดี", value: "thursday" },
  { label: "วันศุกร์", value: "friday" },
  { label: "ทั้งหมด", value: "all" },
];

const types = [
  { label: "การเรียนการสอน", value: "class" },
  { label: "กิจกรรม", value: "activity" },
  { label: "ทั้งหมด", value: "all" },
];

const statuses = [
  { label: "รอเช็คอิน", value: "pending", color: "text-yellow-500" },
  { label: "คอมเฟิร์ม", value: "confirmed", color: "text-green-500" },
  { label: "ถูกยกเลิก", value: "cancelled", color: "text-red-500" },
  { label: "รวม", value: "all", color: "text-blue-500" },
];

const column = [
  ["B", "E"],
  ["H", "K"],
  ["N", "Q"],
];

export const PATCH = async (req) => {
  try {
    if (!process.env.GOOGLE_CREDENTIALS)
      return NextResponse.json(
        { message: "GOOGLE_CREDENTIALS is required!" },
        { status: 400 }
      );
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS.replace("GOOGLE_CREDENTIALS=", ""));
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1a91meja_5LrcfcGxtj2FKvmAe1dfcm6eCaJ5bqbRHxM";

    //   Calculate Date

    const now = new Date(new Date().getTime() + 1000 * 60 * 60 * 7);
    const day = now.getUTCDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const monday = new Date(now);
    monday.setUTCDate(now.getUTCDate() + diff);
    monday.setUTCHours(0, 0, 0, 0);
    console.log(now.toUTCString());
    console.log(monday.toUTCString());
    const friday = new Date(monday.getTime() + 1000 * 60 * 60 * 24 * 4);
    console.log(friday.toUTCString());

    const year =
      monday.getUTCFullYear() + (monday.getUTCMonth() < 4 ? 542 : 543);
    console.log(year);

    const countResult = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${year}!Z1:Z2`,
    });
    console.log(countResult.data.values);

    const latest =
      countResult.data.values != undefined ? countResult.data.values[0][0] : "";
    let cnt = Number(
      countResult.data.values != undefined ? countResult.data.values[1][0] : 0
    );
    if (monday.toUTCString() == latest) cnt = cnt - 1;

    console.log("count: ", cnt);

    // calculate sheetId

    const sheetResult = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    const destinationSheet = sheetResult.data.sheets.filter(
      (s) => s.properties.title === `${year}`
    );
    const destinationSheetId = destinationSheet[0].properties.sheetId;
    console.log("destination Sheet id:", destinationSheetId);

    //  copy template
    const requests = [
      {
        copyPaste: {
          source: {
            sheetId: 1525768262,
            startRowIndex: 0,
            endRowIndex: 8,
            startColumnIndex: 0,
            endColumnIndex: 18,
          },
          destination: {
            sheetId: destinationSheetId,
            startRowIndex: cnt * 10,
            endRowIndex: cnt * 10 + 8,
            startColumnIndex: 0,
            endColumnIndex: 18,
          },
          pasteType: "PASTE_NORMAL",
        },
      },
    ];

    const copyResult = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests,
      },
    });

    // Update Title
    const ranges = [
      `${year}!A${cnt * 10 + 1}`,
      `${year}!G${cnt * 10 + 1}`,
      `${year}!M${cnt * 10 + 1}`,
    ];
    for (const range of ranges) {
      // console.log(range);

      const updateTitleResult = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [
              `${monday.getUTCDate()} ${monthNames[monday.getUTCMonth()]} ${
                monday.getUTCFullYear() + 543
              } - ${friday.getUTCDate()} ${monthNames[friday.getUTCMonth()]} ${
                friday.getUTCFullYear() + 543
              }`,
            ],
          ],
        },
      });
    }

    //   ดึงข้อมูลจาก Supabase
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("booking_id, day, type, status");

    if (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json(
        { message: "Error fetching bookings", error },
        { status: 500 }
      );
    }
    // console.log(bookings);

    // update dashboard
    types.forEach(async (type, typeIndex) => {
      const range = `${year}!${column[typeIndex][0]}${cnt * 10 + 3}:${
        column[typeIndex][1]
      }${cnt * 10 + 8}`;
      const values = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      days.forEach(async (day, dayIndex) => {
        statuses.forEach(async (status, statusIndex) => {
          values[dayIndex][statusIndex] = bookings
            .filter(
              (booking) => booking.type === type.value || type.value === "all"
            )
            .filter(
              (booking) => booking.day === day.value || day.value === "all"
            )
            .filter(
              (booking) =>
                booking.status == status.value || status.value === "all"
            ).length;
        });
      });
      // console.log(values);
      const result = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values,
        },
      });
      // console.log("Updated: ", result.data);
    });

    const updateCountResult = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${year}!Z1:Z2`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[monday.toUTCString()], [cnt + 1]],
      },
    });

    return NextResponse.json(
      { message: "Spreadsheet updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PATCH:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
