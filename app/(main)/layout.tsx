import { Card } from "@mui/material";
import ProfileSidebar from "../components/ProfileSidebar";
import HeaderBar from "../components/HeaderBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-start">
            {/* Header */}
            <HeaderBar />

            {/* Main content section */}
            <div className="h-full w-full flex flex-row justify-center items-start">
                <div className="w-[1200px] mx-4 h-full flex md:flex-row md:justify-between md:items-start flex-col items-center justify-start">
                    {children}
                </div>
            </div>
        </div>
    );
}
