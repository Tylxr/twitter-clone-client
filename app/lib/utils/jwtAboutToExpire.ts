export default function jwtAboutToExpire(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map((c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );

    // Check if JWT expiration is under 1 minute away
    const payload = JSON.parse(jsonPayload);
    return payload.exp - Math.floor(Date.now() / 1000) < 60;
}
