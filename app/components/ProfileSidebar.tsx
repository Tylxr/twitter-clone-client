import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@mui/material";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import coreFetch from "../lib/coreFetch";
import { useAppSelector } from "../store/hooks";

export default function ProfileSidebar() {
    const username = useAppSelector(({ app }) => app.username);
    const [localData, setLocalData] = useState({
        followersFormatted: "",
        followingFormatted: "",
        username: "",
        name: "",
        bio: "",
    });

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const userProfileResponse = await coreFetch(`/userProfile/${username}`, { method: "GET" });

                if (userProfileResponse && userProfileResponse.status === 200) {
                    setLocalData(userProfileResponse.data.userProfile);
                } else {
                    console.error(
                        userProfileResponse
                            ? userProfileResponse.data.errorMessage
                            : "An error occurred trying to get the user profile data."
                    );
                }
            } catch (err) {
                debugger;
                console.error(err);
            }
        };

        getProfileData();
    }, [username]);

    return (
        <div>
            <div className="mb-8 flex flex-row justify-center items-center">
                <Avatar initial="T" size="huge" />
            </div>
            <div className="mb-8 flex flex-row justify-center items-center">
                <Card className="flex flex-col justify-center items-center p-4 mr-6">
                    <span className="font-bold text-xl">{localData.followersFormatted || 0}</span>
                    <span className="text-sm">Followers</span>
                </Card>
                <Card className="flex flex-col justify-center items-center p-4 ml-6">
                    <span className="font-bold text-xl">{localData.followingFormatted || 0}</span>
                    <span className="text-sm">Following</span>
                </Card>
            </div>
            <div className="mb-8">
                <Card className="p-4">
                    <div className="hover:underline flex flex-row items-center justify-end text-sm hover:text-sky-800 text-gray-400">
                        <span className="mr-2 cursor-pointer">Edit</span>
                        <FontAwesomeIcon icon={faPencil} className="w-4 cursor-pointer" />
                    </div>
                    <div className="pb-4 border-gray-200 border-solid border-0 border-b-2">
                        <span className="text-lg font-bold">{localData.username}</span>
                    </div>
                    <div>
                        <p className="mb-1 font-medium">{localData.name}</p>
                        <p className="text-sm m-0">{localData.bio}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
