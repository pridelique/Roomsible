import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { toZonedTime } from "date-fns-tz";
import { endOfWeek } from "@node_modules/date-fns/endOfWeek";
import { addDays } from "@node_modules/date-fns/addDays";

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
    const now = new Date()
    now.setUTCHours(now.getUTCHours() + 7);

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("status", "pending")
      .lte("expired_at", now.toISOString())
      .select("room, user_id");
    if (error) {
      console.error("Error updating bookings:", error);
      return NextResponse.json(
        { error: "Failed to update bookings" },
        { status: 500 }
      );
    }
    // console.log(data);

    const updateUser = {};
    const affectedUserIds = [...new Set(data.map((bookings) => bookings.user_id))];

    for (const user_id of affectedUserIds) {
      const { data: user, error: userError } = await supabaseAdmin
        .from("users")
        .select("auto_cancel_count")
        .eq("user_id", user_id)
        .single();

      if (userError || !user) {
        console.error("Error fetching user data:", userError);
        updateUser[user_id] = userError.message;
        continue;
      }
      const { auto_cancel_count } = user;
      const newAutoCancelCount = auto_cancel_count + 1;
      let BannedUntil = endOfWeek(now, { weekStartsOn: 1 });
      BannedUntil.setUTCHours(23, 59, 59, 999);
      console.log(now.toISOString(), BannedUntil.toISOString());
      
      // Add 6 days to the end of the this week
      if (newAutoCancelCount >= 7)
        BannedUntil = addDays(BannedUntil, 28);
      else if (newAutoCancelCount >= 5)
        BannedUntil = addDays(BannedUntil, 14);
      else if (newAutoCancelCount >= 3)
        BannedUntil = addDays(BannedUntil, 7);

      const { error: userUpdateError } = await supabaseAdmin
        .from("users")
        .update({
          auto_cancel_count: newAutoCancelCount,
          banned_until: newAutoCancelCount >= 3 ? BannedUntil.toISOString(): null,
        })
        .eq("user_id", user_id);

      if (userUpdateError) {
        console.error("Error updating user data:", userUpdateError);
        updateUser[user_id] = userUpdateError.message;
        continue;
      }
      if (newAutoCancelCount >= 3) {
        updateUser[user_id] = `banned until ${BannedUntil.toISOString()}`;
      } else {
        updateUser[user_id] = `updated successfully`;
      }
    }
    if (Object.keys(updateUser).length !== 0) {
      const { error }  = await supabaseAdmin
        .from('logs')
        .insert({
          execution: updateUser
        });
      if (error) {
        console.error("Error inserting logs:", error);
        return NextResponse.json(
          { error: "Failed to insert logs", data, updateUser },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Logs updated successfully", data, updateUser },
        { status: 200 }
      );
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
