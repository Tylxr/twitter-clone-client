import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				// "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				// "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

				// Used sky-400 -> sky-700
				"light-blue-gradient": "linear-gradient(90deg, rgba(3,105,161,1) 0%, rgba(56,189,248,1) 100%)",
				// Used sky-900 -> sky-950
				"dark-blue-gradient": "linear-gradient(90deg, rgba(8,47,73,1) 0%, rgba(12,74,110,1) 100%)",
				"black-gradient": "linear-gradient(90deg, rgba(7,14,18,1) 0%, rgba(8,28,38,1) 100%)",
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
	important: "#__next",
};
export default config;
