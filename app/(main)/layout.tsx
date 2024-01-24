import { Card } from "@mui/material";
import ProfileSidebar from "../components/ProfileSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <div>
                <div className="w-full h-20 bg-gray-600 text-white">Header bar component</div>
            </div>

            {/* Main content section */}
            <div className="bg-black-gradient h-full w-full flex flex-row justify-center items-start">
                <div className="bg-lime-0 w-[1200px] h-full flex flex-row justify-between items-center">
                    <div className="bg-purple-0 w-1/3 h-full">
                        <div className="m-4">
                            <ProfileSidebar
                                initial="J"
                                username="@tylerjeremiahh"
                                followers="1.3k"
                                following="57"
                                name="Tyler Marshall"
                                bio="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere repudiandae quasi nam sequi doloremque fugiat omnis inventore cumque deserunt, sapiente suscipit voluptatem veritatis. Placeat autem dolorem magni! Velit, dignissimos commodi!"
                            />
                        </div>
                    </div>
                    <div className="bg-orange-0 w-2/3 h-full">
                        <div className="m-4">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
