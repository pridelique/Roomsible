import { NextResponse } from "@node_modules/next/server";
import jwt from 'jsonwebtoken';
export const POST = async (req) => {
    const { room } = await req.json();
    const token = jwt.sign({ room }, process.env.JWT_SECRET_KEY);
    return NextResponse.json({ token }, { status: 200 });
}