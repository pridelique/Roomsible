import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { closedFrom, openAt } = await req.json();
  console.log(closedFrom, openAt);
    if (!closedFrom || !openAt) {
        return NextResponse.json(
        { error: "closed_from and open_at are required" },
        { status: 400 }
        );
    }
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabaseAdmin
    .from("closed_schedules")
    .insert([
        { 
            closed_from: closedFrom, 
            open_at: openAt 
        }
    ]);
  if (error) {
    console.error("error inserting closed schedule:", error);
    return NextResponse.json(
      { error: "Failed to set closed schedule" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Closed schedule set successfully" },
    { status: 200 }
  );
};

export const DELETE = async (req) => {
    const { id } = await req.json();

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const { data, error } = await supabaseAdmin
        .from("closed_schedules")
        .delete()
        .eq("id", id);
    if (error) {
        console.error("error deleting closed schedule:", error);
        return NextResponse.json(
        { error: "Failed to delete closed schedule" },
        { status: 500 }
        );
    }
    return NextResponse.json(
      { message: `Closed schedule deleted successfully id ${id}` },
      { status: 200 }
    );
}
