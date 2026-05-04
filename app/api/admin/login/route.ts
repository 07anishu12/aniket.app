import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Check against the env variable
    if (password === process.env.ADMIN_PASSWORD) {
      // Set the session cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_session", "1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Incorrect password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
