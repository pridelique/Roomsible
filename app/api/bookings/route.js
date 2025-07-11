import { createRouteHandlerClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { cookies } from "@node_modules/next/headers";
import { NextResponse } from "@node_modules/next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  const {
    room,
    building,
    period,
    day,
    type,
    teacher,
    studentClass,
    subject,
    detail,
  } = await req.json();
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  try {
    // get user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Error fetching user:", userError);
      return NextResponse.json(
        { message: "Failed to fetch user" },
        { status: 500 }
      );
    }
    const user_id = user.id;

    // check if the room is already booked
    const { data: existingBooking, error: bookingCheckError } = await supabase
      .from("bookings")
      .select("status")
      .single()
      .eq("room", room)
      .eq("day", day)
      .eq("period", period);

    if (existingBooking) {
      return NextResponse.json({ message: "Already booked" }, { status: 400 });
    }

    const { error: bookingError } = await supabase.from("bookings").insert({
      room,
      building,
      period,
      day,
      type,
      teacher,
      student_class: studentClass,
      subject,
      detail,
      user_id,
    });
    if (bookingError) {
      console.error("Error during booking:", bookingError);
      return NextResponse.json(
        { message: "Failed to book room" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Booking successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during booking:", error);
    return NextResponse.json(
      { message: "Unexpected error occured" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  const { booking_id } = await req.json();
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Error fetching user:", userError);
      return NextResponse.json(
        { message: "Failed to fetch user" },
        { status: 500 }
      );
    }
    const user_id = user.id;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("booking_id", booking_id)
      .eq("user_id", user_id);
    if (error) {
      console.error("Error during booking deletion:", error);
      return NextResponse.json(
        { message: "Failed to delete booking" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during booking deletion:", error);
    return NextResponse.json(
      { message: "Unexpected error occured" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req) => {
  const { token, day, period } = await req.json();
  // day = "monday";
  // period = 1;
  //   console.log("Token:", token, "Day:", day, "Period:", period);
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { room } = data;

    if (
      period === "before-school" ||
      period === "after-school" ||
      day === "saturday" ||
      day === "sunday"
    ) {
      console.error("No booking found for the given room, day, and period");
      return NextResponse.json(
        { message: "No booking found", room },
        { status: 404 }
      );
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Error fetching user:", userError);
      return NextResponse.json(
        { message: "Failed to fetch user" },
        { status: 500 }
      );
    }
    const user_id = user.id;

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("status, booking_id, building")
      .eq("room", room)
      .eq("day", day)
      .eq("period", period)
      .eq("user_id", user_id)
      .limit(1);

    if (bookingError) {
      console.error("Error fetching booking:", bookingError);
      return NextResponse.json(
        { message: "Failed to fetch booking" },
        { status: 500 }
      );
    }

    if (booking.length === 0) {
      console.error("No booking found for the given room, day, and period");
      return NextResponse.json(
        { message: "No booking found", room },
        { status: 404 }
      );
    }

    const { booking_id, status, building } = booking[0];

    if (status === "confirmed") {
      console.error("Booking already confirmed");
      return NextResponse.json(
        { message: "Booking already confirmed", room, building },
        { status: 400 }
      );
    }
    // console.log("Booking ID:", booking_id);
    // console.log("status:", status);

    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("booking_id", booking_id);

    if (updateError) {
      console.error("Error during booking update:", updateError);
      return NextResponse.json(
        { message: "Failed to update booking" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Booking confirmed successfully", room, building },
      { status: 200 }
    );
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.error("Invalid token");
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    console.error("Error during booking update:", error);
    return NextResponse.json(
      { message: "Unexpected error occured" },
      { status: 500 }
    );
  }
};
