import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { toZonedTime } from "date-fns-tz";

export const GET = async (req) => {

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
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("status", "pending")
      .lte("expired_at", (toZonedTime(new Date(), "Asia/Bangkok").toISOString()))
      .select("room, user_id");
    if (error) {
      console.error("Error updating bookings:", error);
      return NextResponse.json(
        { error: "Failed to update bookings" },
        { status: 500 }
      );
    }
    // console.log(data);

    const updateUser = [];
    const affectedUserIds = [...new Set(data.map((bookings) => bookings.user_id))];

    for (const user_id of affectedUserIds) {
      const { data: user, error: userError } = await supabaseAdmin
        .from("users")
        .select("auto_cancel_count")
        .eq("user_id", user_id)
        .single();

      if (userError || !user) {
        console.error("Error fetching user data:", userError);
        updateUser.push({ user_id, error: userError.message });
        continue;
      }
      const { auto_cancel_count } = user;
      const newAutoCancelCount = auto_cancel_count + 1;
      const BannedUntil = toZonedTime(new Date(), "Asia/Bangkok");
      // Set to the start of the week (Monday)
      
      BannedUntil.setDate(BannedUntil.getDate() - (BannedUntil.getDay() - 1));
      BannedUntil.setHours(0, 0, 0, 0);
      // Add 6 days to the end of the this week
      BannedUntil.setDate(BannedUntil.getDate() + 6);
      if (newAutoCancelCount >= 7)
        BannedUntil.setDate(BannedUntil.getDate() + 28);
      else if (newAutoCancelCount >= 5)
        BannedUntil.setDate(BannedUntil.getDate() + 14);
      else if (newAutoCancelCount >= 3)
        BannedUntil.setDate(BannedUntil.getDate() + 7);


      const { error: userUpdateError } = await supabaseAdmin
        .from("users")
        .update({
          auto_cancel_count: newAutoCancelCount,
          banned_until: newAutoCancelCount >= 3 ? BannedUntil.toISOString(): null,
        })
        .eq("user_id", user_id);

      if (userUpdateError) {
        console.error("Error updating user data:", userUpdateError);
        updateUser.push({ user_id, error: userUpdateError.message });
        continue;
      }
      if (newAutoCancelCount >= 3) {
        updateUser.push({ user_id, message: `banned until ${BannedUntil.toISOString()}` });
      } else {
        updateUser.push({ user_id, message: `updated successfully` });
      }
    }
    return NextResponse.json(
      { message: "Expired bookings checked successfully", data, updateUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking expired bookings:", error);
    return NextResponse.json(
      { error: "Failed to check expired bookings" },
      { status: 500 }
    );
  }
};
