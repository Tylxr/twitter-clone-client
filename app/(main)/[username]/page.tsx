"use client";

import Avatar from "@/app/components/Avatar";
import Tweet from "@/app/components/Tweet";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { username: string } }) {
    const router = useRouter();
    const data: any = {
        followers: "849",
        following: "356",
        initial: "L",
        bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta doloremque sunt neque id veniam! Nesciunt, quod dolore, corporis adipisci labore deserunt repudiandae facere explicabo illum expedita laudantium quia animi exercitationem.",
        name: "Lauren Addison",
    };

    if (!data) {
        return <p className="text-white">No user found with username: {params.username}</p>;
    }

    return (
        <div className="mt-4">
            {/* Back button */}
            <div onClick={() => router.back()} className="w-fit">
                <span className="cursor-pointer text-white hover:text-gray-200 flex flex-row justify-start items-center mb-6">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                    <span className="ml-2">Back</span>
                </span>
            </div>

            {/* User's profile */}
            <div className="text-white flex flex-col xs:flex-row xs:justify-between items-center xs:items-start border-white border-solid border-0 border-b pb-4 mb-4">
                <Card className="p-4 xs:mr-2 max-w-[400px] order-3 xs:order-1">
                    <div className="pb-4 border-gray-200 border-solid border-0 border-b-2">
                        <span className="text-lg font-bold">{params.username}</span>
                    </div>
                    <div>
                        <p className="mb-1 font-medium">{data.name}</p>
                        <p className="text-sm m-0">{data.bio}</p>
                    </div>
                </Card>
                <div className="w-full flex xs:flex-col flex-row justify-center xs:justify-between items-center mx-2 order-2 xs:order-2">
                    <Card className="flex flex-col justify-center items-center p-4 mx-4 xs:mx-0 xs:mb-2 max-w-[70px]">
                        <span className="font-bold text-xl">{data.followers}</span>
                        <span className="text-sm">Followers</span>
                    </Card>
                    <Card className="flex flex-col justify-center items-center p-4 mx-4 xs:mx-0 xs:mt-2 max-w-[70px]">
                        <span className="font-bold text-xl">{data.following}</span>
                        <span className="text-sm">Following</span>
                    </Card>
                </div>
                <div className="flex flex-col justify-center items-center ml-2 order-1 xs:order-3">
                    <div className="mb-4 flex flex-row justify-center items-center">
                        <Avatar initial="D" size="large" />
                    </div>

                    <Button variant="outlined" size="small" className="min-w-[100px] border-white text-white">
                        Follow
                    </Button>
                </div>
            </div>

            {/* User's tweets */}
            {/* TODO: Limit to 5 at a time */}
            <div>
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
            </div>
        </div>
    );
}
