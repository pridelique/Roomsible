import { createMiddlewareClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { cookies } from "@node_modules/next/headers";
import { NextResponse } from "@node_modules/next/server";

export const middleware = async (req) => {
    const { pathname } = req.nextUrl;
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    return res;
}

export const config = {
    matcher: []
}