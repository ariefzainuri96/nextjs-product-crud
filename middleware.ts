import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
    const currentUser = cookies().get("currentUser")?.value;

    // redirect to dashboard if cookies is active
    if (currentUser && !request.nextUrl.pathname.startsWith("/")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // redirect to login if cookies is inactive
    if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
        if (request.nextUrl.pathname.startsWith("/register")) {
            // redirect to register
        } else {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
