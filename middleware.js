import { createMiddlewareClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { NextResponse } from "@node_modules/next/server";

export const middleware = async (req) => {
    const { pathname } = req.nextUrl;
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();
    const user_id = session?.user.id;
    
    if (pathname.startsWith('/login') && session) {
        // If user is already logged in, redirect to home page
        return NextResponse.redirect(new URL('/',req.url))
    } else if (pathname.startsWith('/admin')) {
        if (session) {
            const { data: { role } } = await supabase.from('users').select('role').eq('user_id', user_id).single(); 
            console.log(role);
            if (role === 'admin') return res;
        }
        return NextResponse.redirect(new URL('/',req.url))
    }
     
    return res;
}

export const config = {
    matcher: ['/admin/:path*', '/login' ]
}