import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("status", "pending")
      .lte("expired_at", new Date().toISOString())
      .select('room')
    if (error) {
      console.error("Error updating bookings:", error);
      return NextResponse.json({ error: "Failed to update bookings" }, { status: 500 });
    }
    console.log(data);
    return NextResponse.json({ message: "Expired bookings checked successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error checking expired bookings:", error);
    return NextResponse.json({ error: "Failed to check expired bookings" }, { status: 500 });
  }
};
