import { NextResponse } from "@node_modules/next/server";

export const GET = () => {

  return NextResponse.json({ message: "hello" }, { status: 200 });
};
