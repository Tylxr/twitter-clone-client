import { NextRequest, NextResponse } from "next/server";
import { ensureAuthenticated } from "./app/lib/authFetch";
import { fetchResponse } from "./app/lib/types";

export async function middleware(request: NextRequest) {
    const tokenCookie = request.cookies.get("twitter_token");
    const publicRoutes = ["/login"];
    const { pathname } = request.nextUrl;
    const loginRedirectUrl = request.nextUrl.clone();
    loginRedirectUrl.pathname = "/login";

    // Public route, allow navigation
    if (publicRoutes.includes(pathname)) return NextResponse.next();

    // Protected route, ensure user is authenticated
    if (!tokenCookie) {
        return NextResponse.redirect(loginRedirectUrl);
    }
    const response: fetchResponse = await ensureAuthenticated(tokenCookie.value);
    if (response && !response.data.error) {
        return NextResponse.next();
    } else {
        console.error(response?.data.errorMessage || "Error checking user authentication.");
        return NextResponse.redirect(loginRedirectUrl);
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
