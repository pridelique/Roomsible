import { createRouteHandlerClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { cookies } from "@node_modules/next/headers";
import { NextResponse } from "@node_modules/next/server";

export const POST = async (req) => {
    const { email, password } = await req.json();
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }
    
    try {
        // login the user
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        
        // Check for error
        if (error || !data) {
            return NextResponse.json({ message: error?.message || 'Login failed' }, { status: 400 });
        }
        console.log(data);

        await supabase.auth.setSession(data.session);
        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Unexpected error occurred' }, { status: 500 });
    }
}