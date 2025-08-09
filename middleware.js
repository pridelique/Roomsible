import { bookableRoom } from "@data";
import { createMiddlewareClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { NextResponse } from "@node_modules/next/server";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { isBookable } from "@utils/isBookable";
import { inInTomorrow } from "@utils/isInTomorrow";
import { isPast } from "@utils/isPast";

const checkDay = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const middleware = async (req) => {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  console.log("Middleware triggered");

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

// form page   
  else if (pathname.startsWith("/form")) {
    if (!session) return NextResponse.redirect(new URL("/", req.url));
    const { searchParams } = req.nextUrl;
    // เหลือเชคห้อง
    const buildingId = searchParams.get("building");
    const room = searchParams.get("room");
    const day = searchParams.get("day");
    const period = Number(searchParams.get("period"));

    if (!buildingId || !room || !day || !period || !bookableRoom.includes(room) || !checkDay.includes(day) || isNaN(period) || period < 1 || period > 10 || buildingId < 0 || buildingId > 7 || !isBookable(day, period, role)) {
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
  matcher: ["/admin/:path*", "/login", "/building/:path*", "/form"],
};
