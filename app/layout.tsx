import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata: Metadata = {
	title: "Twitter Clone",
	description: "An over-engineered, low-scope Twitter (X) clone, by Tyler Marshall.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body style={{ fontFamily: "Roboto-400" }}>{children}</body>
		</html>
	);
}
