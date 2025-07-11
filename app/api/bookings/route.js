import { createRouteHandlerClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { cookies } from "@node_modules/next/headers";
import { NextResponse } from "@node_modules/next/server";

export const POST = async (req) => {
    const { room, building, period, day, type, teacher, studentClass, subject, detail } = await req.json();
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    try {
        // get user
        const { data: { user }, error: userError } = await supabase.auth.getUser(); 
        if (userError || !user) {
            console.error("Error fetching user:", userError);
            return NextResponse.json({ message: 'Failed to fetch user'}, { status: 500 });
        }
        const user_id = user.id;

        // check if the room is already booked
        const { data: existingBooking, error: bookingCheckError } = await supabase
        .from("bookings")
        .select('status')
        .single()
        .eq('room', room)
        .eq('day', day)
        .eq('period', period)

        if (existingBooking) {
            return NextResponse.json({ message: 'Already booked' }, { status: 400 });
        }

        const { error: bookingError } = await 
        supabase
        .from("bookings")
        .insert({
            room,
            building,
            period,
            day,
            type,
            teacher,
            student_class: studentClass,
            subject,
            detail,
            user_id
        })
        if (bookingError) {
            console.error("Error during booking:", bookingError);
            return NextResponse.json({ message: 'Failed to book room'}, { status: 500 });
        }
        return NextResponse.json({ message: "Booking successful" }, { status: 200 });

    } catch (error) {
        console.error("Error during booking:", error);
        return NextResponse.json({ message: 'Unexpected error occured'}, { status: 500 });
    }

}

export const DELETE = async (req) => {
    const { booking_id } = await req.json();
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser(); 
        if (userError || !user) {
            console.error("Error fetching user:", userError);
            return NextResponse.json({ message: 'Failed to fetch user'}, { status: 500 });
        }
        const user_id = user.id;

        const { error } = await 
        supabase
        .from("bookings")
        .delete()
        .eq('booking_id', booking_id)
        .eq('user_id', user_id);
        if (error) {
            console.error("Error during booking deletion:", error);
            return NextResponse.json({ message: 'Failed to delete booking'}, { status: 500 });
        }
        return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error during booking deletion:", error);
        return NextResponse.json({ message: 'Unexpected error occured'}, { status: 500 });
    }
}