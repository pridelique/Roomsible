import { NextResponse } from "@node_modules/next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const building = searchParams.get("building");
    const day = searchParams.get("day");
    const period = searchParams.get("period");
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    if (!building || !day || !period) {
        return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
    }

    try {
        await
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ message: "Failed to fetch bookings" }, { status: 500 });
    }
    return NextResponse.json({ message: "This is a GET request" }, { status: 200 });
}