import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Open_Sans } from "next/font/google";
import StoreProvider from "./store/StoreProvider";

export const metadata: Metadata = {
    title: "Twitter Clone",
    description: "An over-engineered, low-scope Twitter (X) clone, by Tyler Marshall.",
};
const openSans = Open_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <html lang="en">
                <body id="__next" className={openSans.className}>
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}
