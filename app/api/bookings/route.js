import { bookableRoom } from "@data/bookableRoom";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs/dist";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isPast } from "@utils/isPast";
import jwt from "jsonwebtoken";
import { getStartTime } from "@utils/getStartTime";
import { isBookable } from "@utils/isBookable";

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

  if (!room || !building || !period || !day || !type) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  // Validate room, building, period, and day

  if (!bookableRoom.includes(room)) {
    return NextResponse.json({ message: "Invalid room" }, { status: 400 });
  }

  
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
    const { role } = user.app_metadata || {};

    // check banned
    const { data: { banned_until }, error: userDataError } = await supabase
      .from("users")
      .select("banned_until")
      .eq("user_id", user_id)
      .single();
    
    // console.log("banned_until:", banned_until);
    
    if (userDataError) {
      console.error("Error fetching user data:", userDataError);
      return NextResponse.json(
        { message: "Failed to fetch user data" },
        { status: 500 }
      );
    }

    if (banned_until) {
      if (banned_until > new Date().toISOString()) {
        return NextResponse.json(
          { message: "Banned" },
          { status: 403 }
        );
      } else {
        // Reset banned_until if the user is no longer banned
        const { error: resetBanError } = await supabase
          .from("users")
          .update({ banned_until: null })
          .eq("user_id", user_id);
        if (resetBanError) {
          console.error("Error resetting ban:", resetBanError);
          return NextResponse.json(
            { message: "Failed to reset ban" },
            { status: 500 }
          );
        }
      }
    }
    
    // Check if the room is bookable for the given day and period
    if (!isBookable(day, period, role, type)) {
      return NextResponse.json(
        { message: "This room is not bookable at this time" },
        { status: 400 }
      );
    }

    // check permissions book 1 activity per week
    if ((role === "student" || role === "leader") && type === "activity") {
      const { data: myBookings, error: myBookingsError } = await supabase
        .from("bookings")
        .select("booking_id")
        .eq("user_id", user_id)
        .eq("type", "activity");

      if (myBookingsError) {
        console.error("Error fetching user bookings:", myBookingsError);
        return NextResponse.json(
          { message: "Failed to fetch user bookings" },
          { status: 500 }
        );
      }

      if (myBookings.length >= 1) {
        return NextResponse.json({ message: "No Permission" }, { status: 403 });
      }
    }

    // get expired time
    const now = new Date();
    const nowPlus10 = new Date(now.getTime() + 10 * 60 * 1000);

    // สมมติ bookingStart คือเวลาเริ่มคาบ
    const bookingStart = getStartTime(day, period);
    bookingStart.setMinutes(bookingStart.getMinutes() + 10);

    const maxTime = Math.max(bookingStart.getTime(), nowPlus10.getTime());
    const expired_at = new Date(maxTime);


    // Check if the room is already booked for the given day and period
    const { data: existingBookings, error: existingBookingsError } = await    supabase
      .from("bookings")
      .select("booking_id")
      .eq("room", room)
      .eq("day", day)
      .eq("period", period)
      .neq("status", "cancelled")
      .limit(1);
    
    if (existingBookingsError) {
      console.error("Error checking existing bookings:", existingBookingsError);
      return NextResponse.json(
        { message: "Failed to check existing bookings" },
        { status: 500 }
      );
    }

    if (existingBookings.length > 0) {
        // Unique violation error code
        return NextResponse.json(
          { message: "Already booked" },
          { status: 409 }
        );
    }


    // Insert the booking into the database
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
      status: type === "class" ? "confirmed" : "pending",
      expired_at: expired_at.toISOString(),
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
