import { NextResponse } from "@node_modules/next/server";
import { createClient } from "@supabase/supabase-js";
export const DELETE = async (req) => {

    const authHeader = req.headers.get("Authorization");

    if (authHeader !== "Bearer ThisIsASecretToken") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { error } = await supabaseAdmin
      .from("bookings")
      .delete()
      .not("booking_id", "is", null); // <--- เพิ่มเงื่อนไขนี้ (สมมติว่า primary key ของคุณคือ 'id')

    if (error) {
        console.error("Error resetting weekly bookings:", error);
        return NextResponse.json(
          { error: "Failed to reset weekly bookings" },
          { status: 500 }
        );
    }

    return NextResponse.json(
      { message: "Weekly bookings reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting weekly bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
