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
                <div className="w-[1200px] h-full flex md:flex-row md:justify-between md:items-start flex-col items-center justify-start">
                    <div className="md:w-1/3 w-full h-full">
                        <div className="m-4">
                            <ProfileSidebar
                                initial="T"
                                username="@tylerjeremiahh"
                                followers="1.3k"
                                following="57"
                                name="Tyler Marshall"
                                bio="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere repudiandae quasi nam sequi doloremque fugiat omnis inventore cumque deserunt, sapiente suscipit voluptatem veritatis. Placeat autem dolorem magni! Velit, dignissimos commodi!"
                            />
                        </div>
                    </div>
                    <div className="md:w-2/3 w-full h-full">
                        <div className="m-4">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
