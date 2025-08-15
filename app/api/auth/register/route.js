import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const POST = async (req) => {
  const { email, password, role, firstname, lastname, classroom, no } = await req.json();
  
  // Validate input
  if (
    !email ||
    !password ||
    !role ||
    !firstname ||
    !lastname ||
    !classroom ||
    !no ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof role !== "string" ||
    typeof firstname !== "string" ||
    typeof lastname !== "string" ||
    typeof classroom !== "string" ||
    typeof no !== "string" ||
    (role != "student" &&
      role != "leader" &&
      role != "teacher" &&
      role != "admin")
  ) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    // sign up the user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Automatically confirm the email
      app_metadata: {
        role, // Store the role in user metadata
      },
    });

    // Check for error
    if (error || !data) {
      return NextResponse.json(
        { message: error?.message || "Registration failed" },
        { status: 400 }
      );
    }

    // Create user profile in the 'users' table
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .insert({
        user_id: data.user.id,
        email: data.user.email,
        firstname,
        lastname,
        classroom,
        no,
        role,
      });

    // Check for user profile creation error
    if (userError) {
      return NextResponse.json(
        { message: userError.message || "Failed to create user profile" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
};
