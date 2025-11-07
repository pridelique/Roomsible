import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const classroom = searchParams.get("classroom");

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { data: users, error: fetchError } = await supabaseAdmin
      .from("users")
      .select("user_id")
      .eq("classroom", classroom);

    if (fetchError) {
      console.error("Error fetching users: ", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error occurred: ", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  const { user_id } = await req.json();

  if (!user_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { error: delError } = await supabaseAdmin.auth.admin.deleteUser(
      user_id
    );
    if (delError) {
      console.error(`❌ Failed to delete ${user_id}`, delError);
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: `User ${user_id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error occurred: ", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
};
