import { NextRequest, NextResponse } from "next/server";
import { authApi } from "./app/lib/api";

type AuthResponse = { data: { error: boolean; errorMessage?: string; token: string } };

export async function middleware(request: NextRequest) {
    const tokenCookie = request.cookies.get("twitter_token");
    const publicRoutes = ["/login"];

    const { pathname } = request.nextUrl;

    // Public route, allow navigation
    if (publicRoutes.includes(pathname)) return NextResponse.next();

    // Protected route, ensure user is authenticated
    if (!tokenCookie) {
        const loginRedirectUrl = request.nextUrl.clone();
        loginRedirectUrl.pathname = "/login";
        return NextResponse.redirect(loginRedirectUrl);
    }
    const response: AuthResponse = await authApi().post("/authenticated");
    if (!response.data.error) {
        return NextResponse.next();
    } else {
        console.error(response.data.errorMessage);
    }

    /**
     * const publicRoutes = ['/login'];
     * const route = route;
     * if !publicRoutes.includes(route)
     *      - Ensure user is authenticated...
     *      if !token -> redirect to /login
     *      else
     *          call /authenticated
     */
    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/"],
};
