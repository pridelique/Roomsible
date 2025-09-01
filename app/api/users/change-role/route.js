import { NextResponse } from "@node_modules/next/server";
import { createClient } from "@supabase/supabase-js";

export const PATCH = async (req) => {
  const { firstname, lastname, classroom, userId, role } = await req.json();

  if (((!firstname || !lastname || !classroom) && !userId) || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  let user_id = userId;

  if (!user_id) {
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("user_id")
      .eq("firstname", firstname)
      .eq("lastname", lastname)
      .eq("classroom", classroom)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user_id = user.user_id;
  }

  const { data, error } = await supabaseAdmin
    .from("users")
    .update({ role })
    .eq("user_id", user_id);
  
  if (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }

  return NextResponse.json({ message: "User role updated successfully" }, { status: 200 });
};