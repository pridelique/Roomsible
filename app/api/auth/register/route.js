import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req) => {
    const { email, password } = await req.json();
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Validate input
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    try {
        // sign up the user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        // Check for error
        if (error || !data) {
            return NextResponse.json({ message: error?.message || 'Registration failed' }, { status: 400 });
        }
        // console.log(data);

        // Create user profile in the 'users' table
        const { data: userData, error: userError } = await
        supabase.from('users').insert({
            user_id: data.user.id,
            email: data.user.email,
            firstname: 'สมปอง',
            lastname: 'สุขสมบูรณ์',
            classroom: 'ม.1.1',
            no: 1,
        })

        // Check for user profile creation error
        if (userError) {
            return NextResponse.json({ message: userError.message || 'Failed to create user profile' }, { status: 400 });
        }
        
        // Set the session cookie
        // await supabase.auth.setSession(data.session);
        return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Unexpected error occurred' }, { status: 500 });
    }
}