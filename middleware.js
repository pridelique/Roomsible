import { bookableRoom } from "@data";
import { createMiddlewareClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { NextResponse } from "@node_modules/next/server";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { isBookable } from "@utils/isBookable";
import { isInTorrorrow } from "@utils/isInTomorrow";
import { isPast } from "@utils/isPast";

const checkDay = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const middleware = async (req) => {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user.id;
  const role = session?.user?.app_metadata?.role;

// login page   
  if (pathname.startsWith("/login") && session) {
    // If user is already logged in, redirect to home page
    return NextResponse.redirect(new URL("/", req.url));
  } 

// admin page
  else if (pathname.startsWith("/admin")) {
    if (session) {
      // console.log(`User role: ${role}`);
      if (role === "admin") return res;
    }
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  // building schedule page
  else if (pathname.startsWith("/building") && pathname.includes("/schedule?room")) {
    const { searchParams } = req.nextUrl;
    // เหลือเชคห้อง
    const room = searchParams.get("room");
    console.log(room);
    
    if (!room || !bookableRoom.includes(room)) {
      return NextResponse.redirect(new URL("/", req.url));   
    }
  }

// building schedule form page   
  else if (pathname.startsWith("/building/") && pathname.includes("/schedule/form")) {
    if (!session) return NextResponse.redirect(new URL("/", req.url));
    const { searchParams } = req.nextUrl;
    // เหลือเชคห้อง
    const room = searchParams.get("room");
    const day = searchParams.get("day");
    const period = Number(searchParams.get("period"));
    console.log(room);

    if (!room || !bookableRoom.includes(room)) {
      return NextResponse.json({ error: "Invalid room" }, { status: 400 });
    } else if (!day || !checkDay.includes(day)) {
      return NextResponse.json({ error: "Invalid day" }, { status: 400 });
    } else if (!period || isNaN(period) || period < 1 || period > 10) {
      return NextResponse.json({ error: "Invalid period" }, { status: 400 });
    } else if (!isBookable(day, period, role, 'display')) {
      return NextResponse.json({ error: "Room is not bookable", day, period, role, currentDay: getCurrentDay(), currentPeriod: getCurrentPeriod() }, { status: 400 });
    }
    
    if (!room || !day || !period || !bookableRoom.includes(room) || !checkDay.includes(day) || isNaN(period) || period < 1 || period > 10 || !isBookable(day, period, role)) {
      return NextResponse.redirect(new URL("/", req.url));   
    }
  }

  if (pathname.startsWith("/building")) {
    const id = Number(pathname.split("/")[2]);
    // console.log(id);
    
    if (!id || id < 1 || id > 7) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
};

export const config = {
  matcher: ["/admin/:path*", "/login", "/building/:path*"],
};
