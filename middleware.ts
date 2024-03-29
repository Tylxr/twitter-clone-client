import { NextRequest, NextResponse } from "next/server";
import { ensureAuthenticated } from "./app/lib/authFetch";
import { FetchResponse } from "./app/lib/types";

export async function middleware(request: NextRequest) {
    const tokenCookie = request.cookies.get("twitter_token")?.value || "";
    const refreshTokenCookie = request.cookies.get("twitter_refresh_token")?.value || "";
    const { pathname } = request.nextUrl;

    // Redirects
    const loginRedirectUrl = request.nextUrl.clone();
    loginRedirectUrl.pathname = "/login";
    const mainRedirectUrl = request.nextUrl.clone();
    mainRedirectUrl.pathname = "/";

    // Handle /login navigation
    if (pathname === "/login") {
        if (!refreshTokenCookie) return NextResponse.next();
        return NextResponse.redirect(mainRedirectUrl);
    }

    // Protected route, ensure user is authenticated
    const response: FetchResponse = await ensureAuthenticated(tokenCookie, refreshTokenCookie);
    if (response && !response.data.error) {
        const resp = NextResponse.next();
        if (response.data.token && response.data.refreshToken) {
            resp.cookies.set("twitter_token", response.data.token, {
                expires: new Date(new Date().getTime() + 60 * 1000),
            });
            resp.cookies.set("twitter_refresh_token", response.data.refreshToken, {
                expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
                httpOnly: true,
            });
        }
        return resp;
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
