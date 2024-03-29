import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                // Used sky-400 -> sky-700
                "light-blue-gradient": "linear-gradient(90deg, rgba(3,105,161,1) 0%, rgba(56,189,248,1) 100%)",

                // Used sky-900 -> sky-950
                "dark-blue-gradient": "linear-gradient(90deg, rgba(8,47,73,1) 0%, rgba(12,74,110,1) 100%)",

                // Custom
                // "black-gradient": "linear-gradient(45deg, rgba(7,14,18,1) 0%, rgba(8,28,38,1) 100%)",
                "black-gradient": "linear-gradient(90deg, rgba(11,23,29,1) 0%, rgba(15,42,55,1) 100%)",
            },
        },
        screens: {
            xs: "525px",
            md: "868px",
            lg: "1024px",
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
    important: "#__next",
};
export default config;
