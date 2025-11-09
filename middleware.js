import { bookableRoom } from "@data";
import { closedDateCache } from "@data/cache";
import { createMiddlewareClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { NextResponse } from "@node_modules/next/server";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { isBookable } from "@utils/isBookable";
import { isInTomorrow } from "@utils/isInTomorrow";
import { isPast } from "@utils/isPast";

const checkDay = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const checkClosedSchedule = async (supabase, nowTime) => {
  const cacheMaxAge = 5 * 60 * 1000;
  const { data: closedDates, error } = await supabase
    .from("closed_schedules")
    .select("id, closed_from, open_at")
    .order("closed_from", { ascending: true });
  if (error) {
    console.error("error fetching closed schedules:", error);
    return;
  }
  var openDate = null;
  closedDates.map(async (date) => {
    const closedFrom = new Date(`${date.closed_from}+07:00`);
    const openAt = new Date(`${date.open_at}+07:00`);
    // console.log(closedFrom);
    // console.log(openAt);

    // console.log(closedFrom.toString());
    // console.log(openAt.toString());

    const closedTime = closedFrom.getTime();
    const openTime = openAt.getTime();

    if (closedTime <= nowTime && nowTime < openTime) {
      if (openDate === null) openDate = openAt;
      else if (openDate.getTime() < openTime) openDate = openAt;
    }
  });

  if (openDate === null) {
    closedDateCache.set("isEnabled", true);
    closedDateCache.set("openDate", null);
    closedDateCache.set("maxAge", nowTime + cacheMaxAge);
  } else {
    closedDateCache.set("isEnabled", false);
    closedDateCache.set("openDate", openDate);
    closedDateCache.set("maxAge", nowTime + Math.min(cacheMaxAge, openDate.getTime() - nowTime));
  }
};

export const middleware = async (req) => {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const nowTime = new Date().getTime();
  // console.log("Middleware triggered");

  // Get user session and role
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user.id;
  const role = session?.user?.app_metadata?.role;
  
  // Closed schedule check
  if (closedDateCache.get("maxAge") < nowTime) {
    closedDateCache.reset();
  }
  if (closedDateCache.get("isEnabled") === undefined) {
    checkClosedSchedule(supabase, nowTime);
  }
  if (pathname.startsWith("/hacker-login")) {
    return res;
  }
  if (pathname.startsWith("/closed")) {
    if (closedDateCache.get("isEnabled") === true) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (role !== "admin") {
    if (closedDateCache.get("isEnabled") === false) {
      return NextResponse.redirect(new URL("/closed", req.url));
    }
  }

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
  else if (
    pathname.startsWith("/building") &&
    pathname.includes("/schedule?room")
  ) {
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

    if (
      !buildingId ||
      !room ||
      !day ||
      !period ||
      !bookableRoom.includes(room) ||
      !checkDay.includes(day) ||
      isNaN(period) ||
      period < 1 ||
      period > 10 ||
      buildingId < 0 ||
      buildingId > 7 ||
      !isBookable(day, period, role)
    ) {
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
  matcher: [
    "/((?!api|_next/static|favicon.ico).*)", // regex: ทุกหน้า ยกเว้น api, next static, favicon
  ],
};
