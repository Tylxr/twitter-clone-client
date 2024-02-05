import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("Request", request);

    const tokenCookie = request.cookies.get("twitter_token");
    const publicRoutes = ["/login"];

    const { pathname } = request.nextUrl;
    if (!publicRoutes.includes(pathname)) {
        if (!tokenCookie) {
            NextResponse.redirect("/login");
        }
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
    matcher: ["/login"],
};
