import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "@node_modules/next/server";

export const DELETE = async (req) => {
  const authHeader = req.headers.get("Authorization");

  if (authHeader !== "Bearer ThisIsASecretToken") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { error } = await supabaseAdmin
      .from("logs")
      .delete()
      .not("id", "is", null); // <--- เพิ่มเงื่อนไขนี้ (สมมติว่า primary key ของคุณคือ 'id')
    
    if (error) {
        console.error("Error resetting weekly logs:", error);
    }

    return NextResponse.json({ message: "Weekly logs reset successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting weekly logs:", error);
    return NextResponse.json({ error: "Failed to reset weekly logs" }, { status: 500 });
  }
};
